"use client";

import Image from "next/image";
import { Song } from "@prisma/client";
import { PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SongItemMenu } from "@/components/song-item-menu";

interface SongItemProps {
  data: Song;
}

export const SongItem = ({ data }: SongItemProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-md bg-neutral-800/20">
      <div className="flex gap-x-3">
        <div className="relative h-20 aspect-square">
          <Image
            fill
            src={data.imageUrl}
            alt={data.title}
            className="rounded-md"
          />
        </div>
        <div>
          <p className="font-semibold">{data.title}</p>
          <p className="text-xs text-muted-foreground">{data.artist}</p>
          {!!data?.genre && (
            <Badge
              variant="secondary"
              className="mt-3"
            >
              {data?.genre}
            </Badge>
          )}
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <SongItemMenu
          songId={String(data.id)}
          title={data.title}
        />
        <button className="transition text-lime-600 hover:text-lime-400">
          <PlayCircle className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};
