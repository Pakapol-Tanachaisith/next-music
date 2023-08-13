"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";

import { cn } from "@/lib/utils";
import { navItems } from "@/constants/nav-items";
import { UserButton } from "@clerk/nextjs";

interface BottomBarProps {
  userId: string | null;
}

export const BottomBar = ({ userId }: BottomBarProps) => {
  const pathname = usePathname();

  return (
    <div className="block p-4 lg:hidden">
      <nav className="flex items-center justify-around">
        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.href}
          >
            <div
              className={cn(
                "flex flex-col items-center gap-y-2 transition",
                pathname === item.href && "text-lime-500"
              )}
            >
              <item.icon className="w-4 h-4" />
              <p className="text-xs">{item.label}</p>
            </div>
          </Link>
        ))}
        {userId ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link href="/sign-in">
            <div className="flex flex-col items-center transition gap-y-2">
              <LogIn className="w-4 h-4" />
              <p className="text-xs">Login</p>
            </div>
          </Link>
        )}
      </nav>
    </div>
  );
};
