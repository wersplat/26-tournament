"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/auth-context";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/lib/graphql/client";
import { useEffect } from 'react';
import { createClient } from '@/lib/supabase';

export function Providers({ children }: { children: React.ReactNode }) {
  // Keep Apollo auth link token fresh on auth changes
  useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      // No-op: auth link reads token per request; listening here ensures client stays live
    });
    return () => subscription?.unsubscribe();
  }, []);
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          {children}
        </ApolloProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
