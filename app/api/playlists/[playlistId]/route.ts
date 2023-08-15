import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface Params {
  playlistId: string;
}

export const PATCH = async (req: Request, { params }: { params: Params }) => {
  try {
    const { userId } = auth();
    const { songId } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!songId) {
      return new NextResponse("Song id required", { status: 400 });
    }

    if (!params.playlistId) {
      return new NextResponse("Playlist id required", { status: 400 });
    }

    const playlist = await prismadb.playlist.findFirst({
      where: {
        id: params.playlistId,
        userId,
      },
      include: {
        songs: true,
      },
    });

    if (!playlist) {
      return new NextResponse("Playlist not found", { status: 404 });
    }

    const songIds = playlist.songs.map((song) => song.id);
    const updatedSongIds = songIds.includes(songId)
      ? songIds.filter((id) => id !== songId)
      : [...songIds, songId];

    await prismadb.playlist.update({
      where: {
        id: params.playlistId,
      },
      data: {
        songs: {
          set: [],
        },
      },
    });

    const updatedPlaylist = await prismadb.playlist.update({
      where: {
        id: params.playlistId,
      },
      data: {
        songs: {
          connect: updatedSongIds.map((item) => ({ id: item })),
        },
      },
      include: {
        songs: true,
      },
    });

    return NextResponse.json(updatedPlaylist);
  } catch (error) {
    console.log("PLAYLIST_PATCH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
