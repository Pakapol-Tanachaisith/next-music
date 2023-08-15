import prismadb from "@/lib/prismadb";
import { Playlist } from "@/types";

const getUserPlaylists = async (userId: string | null): Promise<Playlist[]> => {
  if (!userId) return [];

  try {
    const playlists = await prismadb.playlist.findMany({
      where: {
        userId,
      },
      include: {
        songs: true,
      },
    });

    return playlists;
  } catch (error) {
    return [];
  }
};

export default getUserPlaylists;
