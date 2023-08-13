"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, Trash2, Pencil } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/alert-modal";
import { toast } from "react-hot-toast";

interface SongItemProps {
  title: string;
  songId: string;
}

export const SongItemMenu = ({ songId, title }: SongItemProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteSong = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/songs/${songId}`);
      setOpen(false);
      router.refresh();
      toast.success("Song deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="ghost"
            size="icon"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash2 className="w-4 h-4 mr-3" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/songs/${songId}`)}>
            <Pencil className="w-4 h-4 mr-3" />
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertModal
        title="Delete song?"
        description={`This action cannot be undone. Do you will want to delete ${title}`}
        isOpen={open}
        disabled={loading}
        onConfirm={deleteSong}
      />
    </>
  );
};
