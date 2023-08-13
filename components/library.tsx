import { Plus } from "lucide-react";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Link from "next/link";

export const Library = () => {
  return (
    <div className="bg-neutral-900 rounded-md min-w-[300px] flex flex-col">
      <div className="flex items-center justify-between px-3 py-2">
        <h2>My Songs</h2>
        <Link href="/songs/upload">
          <Button
            variant="ghost"
            size="icon"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </Link>
      </div>
      <Separator />
      <div className="flex-grow px-3 py-2 overflow-y-auto">List of songs</div>
    </div>
  );
};
