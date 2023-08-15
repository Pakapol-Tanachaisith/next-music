"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Playlist } from "@/types";
import usePlaylistModal from "@/hooks/use-playlist-modal";
import { ModalBase } from "@/components/modals/modal-base";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface PlaylistModalProps {
  playlists: Playlist[];
}

export const PlaylistModal = ({ playlists }: PlaylistModalProps) => {
  const playlistModal = usePlaylistModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const onCreate = async () => {
    if (!name) return;

    try {
      setLoading(true);
      await axios.post(`/api/playlists`, {
        name,
        songId: playlistModal?.songId,
      });
      playlistModal.onClose();
      setName("");
      toast.success("Playlist created");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onAdd = async (playlistId: string) => {
    if (!playlistModal?.songId || !playlistId) return;

    try {
      setLoading(true);
      await axios.patch(`/api/playlists/${playlistId}`, {
        songId: playlistModal.songId,
      });
      router.refresh();
      toast.success("Added song to the playlist");
      playlistModal.onClose();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPlaylist = playlists.filter((playlist) => {
    const alreadyAdded = playlist.songs.find(
      (song) => song.id === playlistModal?.songId
    );

    return !Boolean(alreadyAdded);
  });

  return (
    <ModalBase
      title="Playlists"
      description="Select a playlist or create a new playlist to add a song to."
      isOpen={playlistModal.isOpen}
      onChange={playlistModal.onClose}
    >
      <div>
        <h2 className="mb-3 text-sm font-semibold">New Playlist</h2>
        <div className="flex items-center gap-x-2">
          <label
            htmlFor="playlist-name"
            className="sr-only"
          >
            Name
          </label>
          <Input
            id="playlist-name"
            placeholder="Awesome Mix"
            value={name}
            disabled={loading}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            disabled={loading}
            variant="secondary"
            onClick={onCreate}
          >
            Create
          </Button>
        </div>
      </div>

      {filteredPlaylist?.length !== 0 && (
        <>
          <Separator className="my-6" />
          <div>
            <h3 className="mb-3 text-sm font-semibold">Select a playlist</h3>
            <ul className="space-y-2">
              {filteredPlaylist.map((item) => (
                <li key={item.id}>
                  <Button
                    disabled={loading}
                    onClick={() => onAdd(item.id)}
                    size="sm"
                    variant="secondary"
                    className="w-full"
                  >
                    {item.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </ModalBase>
  );
};
