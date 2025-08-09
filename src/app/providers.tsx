"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/auth-context";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/lib/graphql/client";
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Keep Apollo auth link token fresh on auth changes
  useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      // No-op: auth link reads token per request; listening here ensures client stays live
    });
    return () => subscription?.unsubscribe();
  }, []);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      disableTransitionOnChange={false}
      forcedTheme={undefined}
    >
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          {children}
        </ApolloProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
