import Link from "next/link";
import { Plus } from "lucide-react";
import { auth } from "@clerk/nextjs";

import getUserSongs from "@/actions/get-user-songs";
import { LibraryItem } from "./library-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Library = async () => {
  const { userId } = auth();

  const songs = await getUserSongs(userId);

  return (
    <div className="bg-neutral-900 rounded-md min-w-[300px] flex flex-col">
      <div className="flex items-center justify-between px-3 py-2">
        <h2>My Songs </h2>
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
        <ul className="space-y-3">
          {songs.map((song) => (
            <LibraryItem
              key={song.id}
              data={song}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
