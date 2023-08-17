"use client";

import { useEffect, useState } from "react";

import usePlayerContext from "@/hooks/use-player";
import { MobilePlayer } from "./mobile-player";
import { DesktopPlayer } from "./desktop-player";

export const Player = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { currentSong } = usePlayerContext();

  useEffect(() => setIsMounted(true), []);

  if (!isMounted || !currentSong) return null;

  return (
    <div className="flex items-center h-16 border-b lg:border-none rounded-b-md bg-neutral-800">
      <MobilePlayer />
      <DesktopPlayer />
    </div>
  );
};
