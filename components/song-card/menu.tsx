"use client";

import axios from "axios";
import { MouseEvent, useEffect, useMemo, useState } from "react";
import { Song } from "@prisma/client";
import { Heart, MoreHorizontal, ListPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

import usePlaylistModal from "@/hooks/use-playlist-modal";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface MenuProps {
  data: Song;
}

export const Menu = ({ data }: MenuProps) => {
  const router = useRouter();
  const { userId } = useAuth();
  const playlistModal = usePlaylistModal();

  const [isMounted, setIsMounted] = useState(false);

  const isLiked = useMemo(
    () => data.likedBy.includes(userId || ""),
    [data?.likedBy, userId]
  );

  const onLike = async (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!userId) return router.push("/sign-in");

    try {
      await axios.patch(`/api/like/${data.id}`);
      router.refresh();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const onPlaylistClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!userId) return router.push("/sign-in");
    playlistModal.onOpen({ songId: data.id });
  };

  useEffect(() => setIsMounted(true), []);

  if (!isMounted || !userId) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="focus:ring-0 focus:ring-offset-0 !outline-none"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{data.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLike}>
          <Heart className={cn("w-4 h-4 mr-3", isLiked && "fill-white")} />
          {isLiked ? "Unlike" : "Like"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onPlaylistClick}>
          <ListPlus className="w-4 h-4 mr-3" />
          Add to playlist
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
