"use client";

import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { Song } from "@prisma/client";
import { PlayCircle, Trash } from "lucide-react";

import usePlayerContext from "@/hooks/use-player";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PlaylistSongItemProps {
  data: Song;
}

export const PlaylistSongItem = ({ data }: PlaylistSongItemProps) => {
  const router = useRouter();
  const { playlistId } = useParams();
  const { loadSongs } = usePlayerContext();

  const [loading, setLoading] = useState(false);

  const onRemove = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/playlists/${playlistId}`, { songId: data.id });
      router.refresh();
      toast.success("Song removed.");
    } catch (error) {
      toast.error("Some thing went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-md bg-neutral-800/20">
      <div className="flex gap-x-3">
        <div className="relative h-20 aspect-square">
          <Image
            fill
            src={data.imageUrl}
            alt={data.title}
            className="rounded-md"
          />
        </div>
        <div>
          <p className="font-semibold">{data.title}</p>
          <p className="text-xs text-muted-foreground">{data.artist}</p>
          {!!data?.genre && (
            <Badge
              variant="secondary"
              className="mt-3"
            >
              {data?.genre}
            </Badge>
          )}
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <Button
          disabled={loading}
          size="icon"
          variant="secondary"
          onClick={onRemove}
        >
          <Trash className="w-4 h-4" />
        </Button>
        <button
          disabled={loading}
          onClick={() => loadSongs(data)}
          className="transition text-lime-600 hover:text-lime-400"
        >
          <PlayCircle className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};
