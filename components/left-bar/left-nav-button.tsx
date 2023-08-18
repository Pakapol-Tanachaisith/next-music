"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";

interface LeftNavButtonProps {
  userId: string | null;
}

export const LeftNavButton = ({ userId }: LeftNavButtonProps) => {
  if (userId) {
    return <UserButton afterSignOutUrl="/" />;
  }

  return (
    <Link href="/sign-in">
      <Button
        variant="ghost"
        size="icon"
      >
        <LogIn className="w-4 h-4" />
      </Button>
    </Link>
  );
};
