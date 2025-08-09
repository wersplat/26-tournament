"use client";

import Link from "next/link";
import { MainNav } from "@/components/navigation/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { UserProfile } from "@/components/auth/user-profile";
import { useAuth } from "@/context/auth-context";
import { Trophy } from "lucide-react";

export function Header() {
  const { user, isAdmin } = useAuth();
  
  // Navigation items shared between desktop and mobile
  const navItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Schedule",
      href: "/tournament/schedule",
    },
    {
      title: "Teams",
      href: "/teams",
    },
    {
      title: "Standings",
      href: "/standings",
    },
    {
      title: "Rankings",
      href: "/rankings",
    },
    {
      title: "Media",
      href: "/media",
    },
    ...(isAdmin ? [
      {
        title: "Admin",
        href: "/admin",
      },
    ] : []),
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          {/* Mobile Navigation */}
          <MobileNav items={navItems} />
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                2K26
              </span>
              <span className="text-xs text-muted-foreground -mt-1">Tournament</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <MainNav />
          </div>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <ModeToggle />
          
          {/* User Profile */}
          <UserProfile />
        </div>
      </div>
    </header>
  );
}
