"use client";

import * as Slider from "@radix-ui/react-slider";
import { useMemo } from "react";
import { LucideIcon, Volume1, Volume2, VolumeX, Volume } from "lucide-react";

import usePlayerContext from "@/hooks/use-player";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

export const VolumeControl = () => {
  const { volume, setVolume, muted, mute } = usePlayerContext();

  const Icon = useMemo<LucideIcon>(() => {
    if (muted) return VolumeX;

    if (volume > 0.5) return Volume2;
    if (volume > 0 && volume < 0.5) return Volume1;
    return Volume;
  }, [muted, volume]);

  const onVolumeChange = (values: number[]) => {
    setVolume(values[0] / 100);
  };

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => mute(!muted)}
        >
          <Icon className="w-5 h-5" />
        </Button>
      </HoverCardTrigger>
      {!muted && (
        <HoverCardContent
          side="top"
          className="w-fit h-[150px] flex flex-col items-center gap-y-2"
        >
          <p className="text-xs text-muted-foreground">100</p>
          <Slider.Root
            className="relative flex items-center justify-center h-full mx-auto select-none touch-none"
            defaultValue={[0]}
            max={100}
            value={[volume * 100]}
            step={1}
            onValueChange={onVolumeChange}
            orientation="vertical"
          >
            <Slider.Track className="relative w-2 h-full rounded-full bg-neutral-800 grow">
              <Slider.Range className="absolute w-2 rounded-full bg-lime-500" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-3 h-3 rounded-full cursor-pointer bg-lime-500"
              aria-label="seek"
            />
          </Slider.Root>
          <p className="text-xs text-muted-foreground">
            {Math.floor(volume * 100)}
          </p>
        </HoverCardContent>
      )}
    </HoverCard>
  );
};
