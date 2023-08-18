"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems } from "@/constants/nav-items";
import { cn } from "@/lib/utils";

export const LeftNavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center gap-5 mt-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          title={item.label}
          className={cn(
            "text-muted-foreground transition hover:text-lime-500",
            pathname === item.href && "text-lime-500"
          )}
        >
          <item.icon className="w-5 h-5" />
        </Link>
      ))}
    </div>
  );
};
