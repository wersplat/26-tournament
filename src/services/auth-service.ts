import { createClient } from '@/lib/supabase';

/**
 * Types for authentication data
 */
export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegistration extends UserCredentials {
  full_name?: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Service for authentication-related functionality
 */
export const authService = {
  /**
   * Sign in with email and password
   */
  signIn: async (credentials: UserCredentials) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  },

  /**
   * Sign up with email and password
   */
  signUp: async (registration: UserRegistration) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: registration.email,
      password: registration.password,
      options: {
        data: {
          full_name: registration.full_name,
        },
      },
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  },

  /**
   * Sign out
   */
  signOut: async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw new Error(error.message);
    }
    
    return true;
  },

  /**
   * Get current user
   */
  getCurrentUser: async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    return data?.user || null;
  },

  /**
   * Get current session
   */
  getSession: async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  /**
   * Reset password
   */
  resetPassword: async (email: string) => {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    
    if (error) {
      throw new Error(error.message);
    }
    
    return true;
  },

  /**
   * Update password
   */
  updatePassword: async (password: string) => {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return true;
  },

  /**
   * Get user profile from backend API
   */
  getUserProfile: async () => {
    // TODO: Implement with GraphQL when user profile endpoint is available
    throw new Error('User profile endpoint not yet implemented');
  }
};
