"use client";

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

interface SongItemProps {
  title: string;
  songId: string;
}

export const SongItemMenu = ({ songId, title }: SongItemProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

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
        onChange={() => setOpen(false)}
        onConfirm={() => {}}
      />
    </>
  );
};
