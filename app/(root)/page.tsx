import type { Metadata } from "next";

import getAllSongs from "@/actions/get-all-songs";
import { Heading } from "@/components/heading";
import { SongCard } from "@/components/song-card";

export const metadata: Metadata = {
  title: "Next Music | Home",
};

const HomePage = async () => {
  const songs = await getAllSongs();

  return (
    <div className="page-container no-scrollbar">
      <div className="p-4  lg:bg-gradient-to-b lg:p-6 lg:pb-[50px] lg:from-lime-700 lg:to-transparent">
        <Heading
          title="Welcome to Next Music"
          description=""
        />
      </div>
      <section className="p-4 lg:p-6">
        <div>
          <h3 className="text-lg font-bold">
            {songs.length} {songs.length === 1 ? "song" : "songs"}
          </h3>
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {songs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
