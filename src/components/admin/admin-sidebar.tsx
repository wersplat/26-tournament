"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Trophy, 
  Calendar, 
  Gamepad2, 
  BarChart3, 
  Settings,
  Home,
  Award,
  Users2,
  FileText
} from "lucide-react";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: Home
  },
  {
    title: "Players",
    href: "/admin/players",
    icon: Users
  },
  {
    title: "Teams",
    href: "/admin/teams",
    icon: Users2
  },
  {
    title: "Events",
    href: "/admin/events",
    icon: Calendar
  },
  {
    title: "Matches",
    href: "/admin/matches",
    icon: Gamepad2
  },
  {
    title: "Statistics",
    href: "/admin/stats",
    icon: BarChart3
  },
  {
    title: "Awards",
    href: "/admin/awards",
    icon: Award
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: FileText
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings
  }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin" className="flex items-center space-x-2">
          <Trophy className="h-6 w-6" />
          <span className="font-bold text-lg">Admin Panel</span>
        </Link>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-secondary"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            </Link>
          );
        })}
      </nav>
      
      <div className="border-t p-4">
        <Link href="/">
          <Button variant="outline" className="w-full">
            ← Back to Site
          </Button>
        </Link>
      </div>
    </div>
  );
} 