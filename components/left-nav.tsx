"use client";

import { Music } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";

import { cn } from "@/lib/utils";
import { navItems } from "@/constants/nav-items";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

interface LeftNavProps {
  userId: string | null;
}

export const LeftNav = ({ userId }: LeftNavProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <div className="relative rounded-md bg-neutral-900">
      <nav className="flex flex-col">
        <Link
          href="/"
          className="p-4 text-primary"
        >
          <Music className="w-6 h-6" />
        </Link>
        <Separator />

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
      </nav>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-2">
        {userId ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link href="/sign-in">
            <Button
              variant="ghost"
              size="icon"
            >
              <LogIn className="w-4 h-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
