"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser, useAuth as useClerkAuth, useClerk } from "@clerk/nextjs";

type AuthContextType = {
  user: any | null; // using any for now to avoid strict type dependency on Clerk user type in this context interface if possible, or use Clerk's type
  loading: boolean;
  isAdmin: boolean;
  signInWithDiscord: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut: clerkSignOut } = useClerkAuth();
  const clerk = useClerk();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      // Check admin status from metadata or email
      const checkAdmin = () => {
      const adminEmails = [
        'admin@bodegacatsgc.gg',
        'christian@bodegacatsgc.gg',
        ];
        const email = user.primaryEmailAddress?.emailAddress;
        
        // Check public metadata if role is set there
        const role = (user.publicMetadata as any)?.role;
        
        if (role === 'admin' || role === 'ADMIN' || (email && adminEmails.includes(email))) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      };
      checkAdmin();
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const signInWithDiscord = async () => {
    // Clerk handles this via their UI usually, but we can trigger it
    // For now, redirect to login page or open sign in modal
    clerk.openSignIn();
  };

  const signOut = async () => {
    await clerkSignOut();
  };

  const value = {
    user: user || null,
    loading: !isLoaded,
    isAdmin,
    signInWithDiscord,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
