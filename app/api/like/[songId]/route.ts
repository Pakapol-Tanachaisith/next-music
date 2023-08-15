import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

interface Params {
  songId: string;
}

export const PATCH = async (req: Request, { params }: { params: Params }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.songId || !Number.isInteger(Number(params.songId))) {
      return new NextResponse("Invalid song id", { status: 400 });
    }

    const song = await prismadb.song.findUnique({
      where: {
        id: Number(params.songId),
      },
    });

    if (!song) {
      return new NextResponse("Song not found", { status: 404 });
    }

    const likedIds = song.likedBy || [];

    let newLikedIds: string[];
    if (likedIds.includes(userId)) {
      // already liked - unlike the song
      newLikedIds = likedIds.filter((id) => id !== userId);
    } else {
      // not liked song yet - like the song
      newLikedIds = [...likedIds, userId];
    }

    const updatedSong = await prismadb.song.update({
      where: {
        id: Number(params.songId),
      },
      data: {
        likedBy: newLikedIds,
      },
    });

    return NextResponse.json(updatedSong);
  } catch (error) {
    console.log("LIKE_PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
