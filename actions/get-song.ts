import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { Song } from "@prisma/client";

const getSongById = async (songId: string): Promise<Song | null> => {
  const { userId } = auth();

  if (!userId) return null;

  const songs = await prismadb.song.findMany({
    where: {
      id: Number(songId),
      userId,
    },
  });

  return songs[0];
};

export default getSongById;
