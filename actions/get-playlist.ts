import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { Playlist } from "@/types";

const getPlaylist = async (
  playlistId: string | null
): Promise<Playlist | null> => {
  const { userId } = auth();

  if (!playlistId || !userId) return null;

  return await prismadb.playlist.findUnique({
    where: {
      id: playlistId,
      userId,
    },
    include: {
      songs: true,
    },
  });
};

export default getPlaylist;
