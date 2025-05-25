"use client";

import Link from "next/link";
import NProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";
import { AnchorHTMLAttributes, useEffect, useRef, useState } from "react";

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  trickleSpeed: 200,
  easing: "ease",
  speed: 300,
});

interface ProgressLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  props?: AnchorHTMLAttributes<HTMLAnchorElement>;
}

const ProgressLink = ({
  href,
  children,
  className,
  onClick,
  props,
}: ProgressLinkProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // // Run any additional onClick handler provided
    // if (onClick) {
    //   onClick(e);
    // }

    // // Compare paths to check if we're clicking the same route
    // const currentFullPath = pathname + searchParams.toString();
    // const hrefPath = href.split("?")[0].split("#")[0];
    // const currentPath = pathname;

    // // Don't start progress if clicking the same exact path with no params/hash
    // if (href === currentFullPath) {
    //   return;
    // }

    // // For same base path but with different query/hash, still show a short progress
    // if (hrefPath === currentPath) {
    //   NProgress.set(0.4);
    //   setTimeout(() => NProgress.done(true), 300);
    //   return;
    // }

    // // Start progress indicator for a navigation
    // NProgress.start();
  };

  // useEffect(() => {
  //   NProgress.done(true);
  // }, [pathname, searchParams]);

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
};

export default ProgressLink;
