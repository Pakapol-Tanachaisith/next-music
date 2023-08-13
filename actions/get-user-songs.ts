import prismadb from "@/lib/prismadb";

const getUserSongs = async (userId: string) => {
  return await prismadb.song.findMany({
    where: {
      userId,
    },
  });
};

export default getUserSongs;
