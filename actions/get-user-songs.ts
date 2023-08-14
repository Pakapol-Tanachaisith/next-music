import prismadb from "@/lib/prismadb";

const getUserSongs = async (userId: string | null) => {
  if (!userId) return [];

  return await prismadb.song.findMany({
    where: {
      userId,
    },
  });
};

export default getUserSongs;
