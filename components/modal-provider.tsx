"use client";

import { useEffect, useState } from "react";

import { PlaylistModal } from "@/components/modals/playlist-modal";
import { Playlist } from "@/types";

interface ModalProviderProps {
  playlists: Playlist[];
}

export const ModalProvider = ({ playlists }: ModalProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <PlaylistModal playlists={playlists} />
    </>
  );
};
