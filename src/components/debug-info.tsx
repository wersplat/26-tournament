"use client";

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/context/auth-context';
import { ClientOnly } from '@/components/client-only';

function DebugInfoContent() {
  const { theme, resolvedTheme } = useTheme();
  const { user, loading, isAdmin } = useAuth();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    // Check for console errors
    const originalError = console.error;
    console.error = (...args) => {
      setErrors(prev => [...prev, args.join(' ')]);
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-background border border-border rounded-lg p-4 shadow-lg max-w-sm z-50">
      <h3 className="font-semibold text-sm mb-2">Debug Info</h3>
      <div className="text-xs space-y-1">
        <div>Mounted: Yes</div>
        <div>Theme: {theme || 'system'}</div>
        <div>Resolved: {resolvedTheme || 'loading'}</div>
        <div>User: {user ? 'Logged in' : 'Not logged in'}</div>
        <div>Loading: {loading ? 'Yes' : 'No'}</div>
        <div>Admin: {isAdmin ? 'Yes' : 'No'}</div>
        {errors.length > 0 && (
          <div className="mt-2">
            <div className="font-semibold text-red-500">Errors:</div>
            {errors.slice(-3).map((error, i) => (
              <div key={i} className="text-red-400 truncate">{error}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function DebugInfo() {
  // Don't render anything in production
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <ClientOnly>
      <DebugInfoContent />
    </ClientOnly>
  );
}
