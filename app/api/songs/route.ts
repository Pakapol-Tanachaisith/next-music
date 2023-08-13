import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { title, artist, genre, imageUrl, audioUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!title || !artist || !imageUrl || !audioUrl) {
      return new NextResponse("Invalid song data", { status: 400 });
    }

    const song = await prismadb.song.create({
      data: {
        title,
        artist,
        genre,
        imageUrl,
        audioUrl,
        userId,
        likedBy: [],
      },
    });

    return NextResponse.json(song);
  } catch (error) {
    console.log("SONGS_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
