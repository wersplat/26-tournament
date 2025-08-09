"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export function MainNav() {
  const pathname = usePathname();
  const { isAdmin } = useAuth();
  
  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/tournament/schedule",
      label: "Schedule",
      active: pathname.startsWith("/tournament"),
    },
    {
      href: "/teams",
      label: "Teams",
      active: pathname.startsWith("/teams"),
    },
    {
      href: "/standings",
      label: "Standings",
      active: pathname.startsWith("/standings"),
    },
    {
      href: "/rankings",
      label: "Rankings",
      active: pathname.startsWith("/rankings"),
    },
    {
      href: "/media",
      label: "Media",
      active: pathname.startsWith("/media"),
    },
    // Admin menu item - only show for admins
    ...(isAdmin ? [{
      href: "/admin",
      label: "Admin",
      active: pathname.startsWith("/admin"),
    }] : []),
  ];

  return (
    <nav className="flex items-center space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
