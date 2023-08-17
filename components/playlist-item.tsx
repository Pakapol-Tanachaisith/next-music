"use client";

import { PlayCircle } from "lucide-react";
import { MouseEventHandler } from "react";

import usePlayerContext from "@/hooks/use-player";
import { Playlist } from "@/types";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface PlaylistItemProps {
  data: Playlist;
}

export const PlaylistItem = ({ data }: PlaylistItemProps) => {
  const router = useRouter();
  const { loadSongs } = usePlayerContext();

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    loadSongs(data.songs);
  };

  return (
    <div
      onClick={() => router.push(`/playlists/${data.id}`)}
      className="flex items-center justify-between px-4 py-5 transition rounded-md cursor-pointer bg-neutral-800/20 hover:bg-neutral-800/50"
    >
      <h3>{data.name}</h3>
      <div className="flex items-center gap-x-4">
        <Button
          size="icon"
          variant="ghost"
          className="hover:text-lime-400"
          onClick={onClick}
        >
          <PlayCircle className="w-8 h-8 text-lime-500" />
        </Button>
      </div>
    </div>
  );
};
