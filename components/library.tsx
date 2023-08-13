import Link from "next/link";
import { Plus } from "lucide-react";
import { Song } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LibraryItem } from "@/components/library-item";

interface LibraryProps {
  songs: Song[];
}

export const Library = ({ songs = [] }: LibraryProps) => {
  return (
    <div className="bg-neutral-900 rounded-md min-w-[300px] flex flex-col">
      <div className="flex items-center justify-between px-3 py-2">
        <h2 className="text-lg font-semibold">My Songs ({songs.length})</h2>
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
      <div className="flex-grow px-3 py-2 overflow-y-auto">
        <ul className="mt-4 space-y-3">
          {songs.map((song) => (
            <li key={song.id}>
              <LibraryItem data={song} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
