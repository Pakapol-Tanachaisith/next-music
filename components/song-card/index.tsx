"use client";

import Image from "next/image";
import { Song } from "@prisma/client";
import { PlayCircle } from "lucide-react";

import usePlayerContext from "@/hooks/use-player";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Menu } from "./menu";

interface SongCardProps {
  song: Song;
}

export const SongCard = ({ song }: SongCardProps) => {
  const { loadSongs } = usePlayerContext();

  return (
    <div>
      <div className="relative aspect-square">
        <Image
          fill
          src={song?.imageUrl || "/assets/music-placeholder.png"}
          alt={song?.title}
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4 pb-2 transition rounded-b-lg hover:bg-neutral-800/70 bg-neutral-800/50">
        <div>
          <p className="text-sm truncate">{song.title}</p>
          <p className="text-xs truncate text-muted-foreground">
            {song.artist}
          </p>
          {!!song?.genre && (
            <Badge
              variant="secondary"
              className="mt-2"
            >
              {song?.genre}
            </Badge>
          )}
        </div>

        {/* ACTIONS */}
        <div className="mt-3 text-right">
          {/* <LikeButton song={song} /> */}
          <Menu data={song} />
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-lime-400"
            onClick={() => loadSongs(song)}
          >
            <PlayCircle className="w-6 h-6 text-lime-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};
