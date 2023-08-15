import type { Metadata } from "next";
import { auth } from "@clerk/nextjs";

import getFavoriteSongs from "@/actions/get-favorite-songs";
import { Heading } from "@/components/heading";
import { FavoriteItem } from "./favorite-item";

export const metadata: Metadata = {
  title: "Next Music | Favorites",
};

const FavoritePage = async () => {
  const { userId } = auth();
  const songs = await getFavoriteSongs(userId);

  return (
    <div className="h-full p-4 overflow-y-scroll rounded-md bg-neutral-900 lg:p-6">
      <Heading
        title="Favorite Songs"
        description=""
      />
      <section className="mt-10">
        <h3 className="mb-6 text-lg font-bold">
          {songs.length} {songs.length === 1 ? "song" : "songs"}
        </h3>
        <ul className="space-y-4">
          {songs.map((song) => (
            <li key={song.id}>
              <FavoriteItem data={song} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
export default FavoritePage;
