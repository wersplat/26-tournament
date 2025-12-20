"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/auth-context";
import { ClerkProvider } from "@clerk/nextjs";
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ClerkProvider>
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      disableTransitionOnChange={false}
      forcedTheme={undefined}
    >
      <AuthProvider>
          {children}
      </AuthProvider>
    </ThemeProvider>
    </ClerkProvider>
  );
}
