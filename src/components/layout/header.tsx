"use client";

import Link from "next/link";
import { MainNav } from "@/components/navigation/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { UserProfile } from "@/components/auth/user-profile";
import { useAuth } from "@/context/auth-context";

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <MobileNav items={navItems} />
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <span className="font-bold text-xl">2K26</span>
          </Link>
          <Link href="/" className="flex items-center space-x-2 md:hidden">
            <span className="font-bold text-xl">2K26</span>
          </Link>
          <div className="hidden md:flex">
            <MainNav />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <UserProfile />
        </div>
      </div>
    </header>
  );
}
