"use client";

import { useState, useEffect } from 'react';

// Breakpoints that match Tailwind CSS default breakpoints
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type BreakpointKey = keyof typeof breakpoints;

/**
 * Custom hook for responsive design
 * @param query Media query string or breakpoint key
 * @returns Boolean indicating if the media query matches
 * 
 * Usage:
 * ```
 * // Using predefined breakpoint
 * const isMobile = useMediaQuery('sm'); // true if screen width < 640px
 * const isTablet = useMediaQuery('md'); // true if screen width < 768px
 * const isDesktop = useMediaQuery('lg'); // true if screen width < 1024px
 * 
 * // Using custom media query
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 * const isPortrait = useMediaQuery('(orientation: portrait)');
 * ```
 */
export function useMediaQuery(query: BreakpointKey | string): boolean {
  // Initialize with null to avoid hydration mismatch
  const [matches, setMatches] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    
    // Convert breakpoint key to media query if needed
    const mediaQuery = Object.keys(breakpoints).includes(query as string)
      ? `(max-width: ${breakpoints[query as BreakpointKey] - 1}px)`
      : query;
    
    const media = window.matchMedia(mediaQuery);
    
    // Set initial value
    setMatches(media.matches);
    
    // Define callback for media query changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add event listener
    media.addEventListener('change', listener);
    
    // Cleanup
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  // Return false during SSR to avoid hydration mismatch
  return mounted ? matches : false;
}
