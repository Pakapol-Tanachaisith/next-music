import prismadb from "@/lib/prismadb";

const getFavoriteSongs = async (userId: string | null) => {
  if (!userId) return [];

  const songs = await prismadb.song.findMany({
    where: {
      likedBy: {
        has: userId,
      },
    },
  });

  return songs;
};

export default getFavoriteSongs;
