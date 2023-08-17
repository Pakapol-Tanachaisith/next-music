"use client";

import {
  PauseCircle,
  PlayCircle,
  SkipBack,
  SkipForward,
  X,
} from "lucide-react";
import * as Slider from "@radix-ui/react-slider";

import usePlayerContext from "@/hooks/use-player";
import { formatDuration } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { VolumeControl } from "./volume-control";

export const DesktopPlayer = () => {
  const {
    togglePlayPause,
    playing,
    songs,
    resetPlayer,
    pos,
    duration,
    pause,
    seek,
    play,
    nextSong,
    prevSong,
  } = usePlayerContext();

  const onChange = (values: number[]) => {
    pause();
    seek(values[0]);
  };

  return (
    <div className="items-center justify-between flex-grow hidden h-full lg:flex gap-x-5">
      {/* LEFT */}
      <div className="flex items-center gap-x-2">
        <Button
          size="icon"
          variant="ghost"
          disabled={songs.length === 1}
          onClick={prevSong}
        >
          <SkipBack className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={togglePlayPause}
        >
          {playing ? (
            <PauseCircle className="w-8 h-8" />
          ) : (
            <PlayCircle className="w-8 h-8" />
          )}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          disabled={songs.length === 1}
          onClick={nextSong}
        >
          <SkipForward className="w-5 h-5" />
        </Button>
      </div>

      {/* CENTER */}
      <div className="flex items-center flex-grow gap-x-3">
        <p className="text-xs text-muted-foreground">{formatDuration(pos)}</p>
        <Slider.Root
          className="relative flex items-center w-full h-5 select-none touch-none"
          defaultValue={[0]}
          max={duration}
          value={[pos]}
          step={1}
          onValueChange={onChange}
          onValueCommit={play}
        >
          <Slider.Track className="bg-neutral-950 relative grow rounded-full h-[3px]">
            <Slider.Range className="absolute h-full rounded-full bg-lime-500" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-2 h-2 rounded-full cursor-pointer bg-lime-500"
            aria-label="seek"
          />
        </Slider.Root>
        <p className="text-xs text-muted-foreground">
          {formatDuration(duration)}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-x-1">
        <VolumeControl />
        <Button
          variant="ghost"
          size="icon"
          onClick={resetPlayer}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
