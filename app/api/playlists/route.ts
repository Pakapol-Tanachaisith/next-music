import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { songId, name } = await req.json();

    if (!name) {
      return new NextResponse("Name required", { status: 400 });
    }

    let promise;

    const playlistData: any = {
      name,
      userId,
    };

    if (songId) {
      playlistData.songs = {
        connect: {
          id: songId,
        },
      };
    }

    const playlist = await prismadb.playlist.create({
      data: playlistData,
      include: {
        songs: true,
      },
    });

    return NextResponse.json(playlist);
  } catch (error) {
    console.log("PLAYLISTS_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
