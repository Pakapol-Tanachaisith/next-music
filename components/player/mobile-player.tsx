"use client";

import Image from "next/image";
import { Pause, Play, X } from "lucide-react";

import usePlayerContext from "@/hooks/use-player";
import { Button } from "@/components/ui/button";

export const MobilePlayer = () => {
  const { currentSong, togglePlayPause, playing, resetPlayer } =
    usePlayerContext();

  return (
    <div className="flex flex-grow h-full lg:hidden">
      <div className="relative h-full aspect-video">
        <Image
          fill
          src={currentSong.imageUrl}
          alt={currentSong.title}
          className="object-cover bg-center"
        />
      </div>
      <div className="flex justify-between w-full px-3 py-2">
        <div>
          <div>
            <p className="text-sm font-semibold truncate">
              {currentSong.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentSong.artist}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayPause}
          >
            {playing ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={resetPlayer}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
