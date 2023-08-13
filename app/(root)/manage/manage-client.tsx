"use client";

import { SongItem } from "@/components/song-item";
import { Song } from "@prisma/client";

interface ManageClientProps {
  songs: Song[];
}

export const ManageClient = ({ songs }: ManageClientProps) => {
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
