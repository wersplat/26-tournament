"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface MobileNavProps {
  items: {
    title: string;
    href: string;
    description?: string;
  }[];
}

export function MobileNav({ items }: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery("md");

  // Close the mobile nav when navigating to a new page
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close the mobile nav when the screen size changes to desktop
  React.useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  if (!isMobile) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <span className="font-bold text-xl">2K26</span>
          </Link>
        </div>
        <div className="flex flex-col space-y-3 p-4">
          {items.map((item) => (
            <MobileNavItem
              key={item.href}
              title={item.title}
              href={item.href}
              isActive={pathname === item.href}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileNavItemProps {
  title: string;
  href: string;
  isActive?: boolean;
}

function MobileNavItem({ title, href, isActive }: MobileNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center py-2 text-base font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      {title}
    </Link>
  );
}
