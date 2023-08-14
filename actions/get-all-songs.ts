import prismadb from "@/lib/prismadb";

const getAllSongs = async () => {
  return await prismadb.song.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default getAllSongs;
