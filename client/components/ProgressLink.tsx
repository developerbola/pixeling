"use client";

import Link from "next/link";
import NProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Configure NProgress
NProgress.configure({ 
  showSpinner: false,
  minimum: 0.1,
  trickleSpeed: 200,
  easing: 'ease',
  speed: 300
});

// Global state for navigation
let loadingTimeout: NodeJS.Timeout | null = null;

/**
 * NavigationEvents - Add this to your root layout to ensure navigation progress works app-wide
 */
export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const prevPathRef = useRef<string>("");
  
  useEffect(() => {
    // Skip the first render to avoid showing progress on initial page load
    if (isFirstRender) {
      setIsFirstRender(false);
      prevPathRef.current = pathname + searchParams.toString();
      return;
    }
    
    const currentPath = pathname + searchParams.toString();
    
    // Only process actual navigation events (path changed)
    if (prevPathRef.current !== currentPath) {
      // Ensure NProgress is complete with a forced done call
      NProgress.done(true);
      
      // Update the prev path ref
      prevPathRef.current = currentPath;
    }
    
    // Clean up any pending timers on unmount
    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
      }
      NProgress.done(true);
    };
  }, [pathname, searchParams, isFirstRender]);
  
  // This component doesn't render anything
  return null;
}

interface ProgressLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  timeoutMs?: number; // Time after which to force complete if navigation doesn't finish
}

/**
 * ProgressLink - A Link component that shows a progress bar during navigation
 */
const ProgressLink = ({ 
  href, 
  children, 
  className,
  onClick,
  timeoutMs = 8000 // Default timeout of 8 seconds
}: ProgressLinkProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Run any additional onClick handler provided
    if (onClick) {
      onClick(e);
    }
    
    // Compare paths to check if we're clicking the same route
    const currentFullPath = pathname + searchParams.toString();
    const hrefPath = href.split("?")[0].split("#")[0];
    const currentPath = pathname;
    
    // Don't start progress if clicking the same exact path with no params/hash
    if (href === currentFullPath) {
      return;
    }
    
    // For same base path but with different query/hash, still show a short progress
    if (hrefPath === currentPath) {
      NProgress.set(0.4);
      setTimeout(() => NProgress.done(true), 300);
      return;
    }
    
    // Start progress indicator for a navigation
    NProgress.start();
    
    // Clear any existing timeout
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }
    
    // Set a safety timeout to ensure the progress always completes
    loadingTimeout = setTimeout(() => {
      NProgress.done(true);
      loadingTimeout = null;
    }, timeoutMs);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};

/**
 * Use this hook in your app to ensure navigation progress works globally
 */
export function useNavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Ensure NProgress is complete on any route change
    NProgress.done(true);
    
    // Clear any existing timeout
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      loadingTimeout = null;
    }
  }, [pathname, searchParams]);
}

export default ProgressLink;