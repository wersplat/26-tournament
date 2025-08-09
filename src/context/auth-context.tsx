"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithDiscord: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const supabase = createClient();

  const checkAdminStatus = async (user: User | null) => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    try {
      // Check if user is admin by looking at their email or user metadata
      const adminEmails = [
        'admin@bodegacatsgc.gg',
        'christian@bodegacatsgc.gg',
        // Add other admin emails as needed
      ];
      
      const isUserAdmin = adminEmails.includes(user.email || '');
      setIsAdmin(isUserAdmin);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Check for active session on mount
    const checkSession = async () => {
      try {
        console.log('Checking session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session check error:', error);
        }
        
        console.log('Session data:', session);
        const currentUser = session?.user || null;
        console.log('Current user:', currentUser);
        
        setUser(currentUser);
        await checkAdminStatus(currentUser);
      } catch (error) {
        console.error('Error checking auth session:', error);
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session);
        const currentUser = session?.user || null;
        setUser(currentUser);
        await checkAdminStatus(currentUser);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, mounted]);

  const signInWithDiscord = async () => {
    try {
      const isLocalhost = window.location.hostname === 'localhost';

      const redirectTo = isLocalhost
        ? 'http://localhost:3000/auth/callback'
        : 'https://dashboard.bodegacatsgc.gg/auth/callback';

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error signing in with Discord:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isAdmin,
    signInWithDiscord,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Handle server-side rendering
  if (typeof window === 'undefined') {
    return {
      user: null,
      loading: true,
      isAdmin: false,
      signInWithDiscord: async () => {},
      signOut: async () => {},
    };
  }
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
