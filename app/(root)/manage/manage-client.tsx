"use client";

import { useEffect, useState } from "react";
import { Song } from "@prisma/client";

import { SongItem } from "@/components/song-item";

interface ManageClientProps {
  songs: Song[];
}

export const ManageClient = ({ songs }: ManageClientProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold">
        {songs.length} {songs.length === 1 ? "song" : "songs"}
      </h3>
      <ul className="space-y-4">
        {songs.map((song) => (
          <li key={song.id}>
            <SongItem data={song} />
          </li>
        ))}
      </ul>
    </div>
  );
};
