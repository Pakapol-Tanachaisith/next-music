import Link from "next/link";
import { Music } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { LeftNavLinks } from "./left-nav-links";
import { LeftNavButton } from "./left-nav-button";

interface LeftNavProps {
  userId: string | null;
}

export const LeftNav = ({ userId }: LeftNavProps) => {
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

        <LeftNavLinks />
      </nav>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-2">
        <LeftNavButton userId={userId} />
      </div>
    </div>
  );
};
