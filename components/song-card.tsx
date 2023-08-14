"use client";

import Image from "next/image";
import { Song } from "@prisma/client";
import { PlayCircle, Heart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SongCardProps {
  song: Song;
}

export const SongCard = ({ song }: SongCardProps) => {
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
        <div className="mt-3 text-right">
          <Button
            size="icon"
            variant="ghost"
          >
            <Heart className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-lime-400"
          >
            <PlayCircle className="w-6 h-6 text-lime-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};
