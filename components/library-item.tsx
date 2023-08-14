"use client";

import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { Song } from "@prisma/client";

interface LibraryItem {
  data: Song;
}

export const LibraryItem = ({ data }: LibraryItem) => {
  return (
    <div className="relative p-2 transition rounded-md cursor-pointer group hover:bg-neutral-800/50 bg-neutral-800/25">
      <div className="flex gap-x-3">
        <Image
          src={data.imageUrl}
          alt={data.title}
          width={50}
          height={50}
          className="rounded-md"
        />
        <div>
          <p className="text-sm tracking-tight">{data.title}</p>
          <p className="mt-2 text-xs font-light tracking-tighter text-muted-foreground">
            {data.artist}
          </p>
        </div>
      </div>

      <button className="absolute right-4 top-[50%] text-lime-500 hover:text-lime-400 transition opacity-0 group-hover:opacity-100 -translate-y-[50%]">
        <PlayCircle size={30} />
      </button>
    </div>
  );
};
