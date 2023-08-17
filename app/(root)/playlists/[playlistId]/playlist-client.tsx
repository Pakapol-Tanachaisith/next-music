"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import usePlayerContext from "@/hooks/use-player";
import { Playlist } from "@/types";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/alert-modal";
import { PlaylistSongItem } from "./playlist-song-item";

interface PlaylistClientProps {
  playlist: Playlist;
}

export const PlaylistClient = ({ playlist }: PlaylistClientProps) => {
  const router = useRouter();
  const { loadSongs } = usePlayerContext();

  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/playlists/${playlist.id}`);
      setOpen(false);
      toast.success("Playlist deleted.");
      router.refresh();
      router.back();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <div className="mt-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">
            {playlist.songs.length}{" "}
            {playlist.songs.length === 1 ? "song" : "songs"}
          </h3>
          <div className="flex items-center gap-x-3">
            <Button
              variant="secondary"
              onClick={() => setOpen(true)}
            >
              Delete Playlist
            </Button>
            <Button onClick={() => loadSongs(playlist.songs)}>
              <Play className="w-4 h-4 mr-2" />
              Play
            </Button>
          </div>
        </div>
        <ul className="space-y-5">
          {playlist.songs.map((song) => (
            <li key={song.id}>
              <PlaylistSongItem data={song} />
            </li>
          ))}
        </ul>
      </div>

      <AlertModal
        isOpen={open}
        title="Delete playlist?"
        description={`Do you really want to delete ${playlist.name}`}
        onConfirm={onDelete}
        onCancel={() => setOpen(false)}
        actionLabel="Delete"
        disabled={loading}
      />
    </>
  );
};
