"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Map, Waves, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/destinations", label: "Explore", icon: Compass },
  { href: "/map", label: "Map", icon: Map },
  { href: "/diving", label: "Dive", icon: Waves },
  { href: "/booking", label: "Book", icon: CalendarCheck },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="bg-white border-t border-border shadow-lg pb-safe">
        <div className="flex items-center justify-around px-2 py-2">
          {mobileNavItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1 px-3 py-1.5 min-w-[56px]"
              >
                <div
                  className={cn(
                    "relative flex items-center justify-center h-9 w-9 rounded-2xl transition-all duration-200",
                    isActive ? "gradient-primary shadow-primary" : "bg-surface-2"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isActive ? "text-white" : "text-text-muted"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-semibold transition-colors",
                    isActive ? "text-primary" : "text-text-light"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
