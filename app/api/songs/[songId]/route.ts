import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

interface Params {
  songId: string;
}

export const DELETE = async (req: Request, { params }: { params: Params }) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    await prismadb.song.deleteMany({
      where: {
        id: Number(params.songId),
        userId,
      },
    });

    return NextResponse.json("Song deleted");
  } catch (error) {
    console.log("SONG_DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const PATCH = async (req: Request, { params }: { params: Params }) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { title, artist, genre, imageUrl, audioUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    await prismadb.song.updateMany({
      where: {
        id: Number(params.songId),
        userId,
      },
      data: {
        title,
        artist,
        genre,
        imageUrl,
        audioUrl,
      },
    });

    return NextResponse.json("Song updated");
  } catch (error) {
    console.log("SONG_PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
