"use client";

import { Plus } from "lucide-react";

import usePlaylistModal from "@/hooks/use-playlist-modal";
import { Playlist } from "@/types";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";

interface PlaylistsClientProps {
  playlists: Playlist[];
}

export const PlaylistsClient = ({ playlists }: PlaylistsClientProps) => {
  const playlistModal = usePlaylistModal();

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">
          {playlists.length} {playlists.length === 1 ? "playlist" : "playlists"}
        </h3>
        <Button onClick={() => playlistModal.onOpen()}>
          <Plus className="w-4 h-4 mr-2" />
          Create
        </Button>
      </div>
      {!playlists.length ? (
        <Empty
          message="No Playlist Found."
          imagePath="/assets/playlist.svg"
        />
      ) : (
        <div>asd</div>
      )}
    </section>
  );
};
