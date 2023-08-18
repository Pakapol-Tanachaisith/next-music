import type { Metadata } from "next";
import { redirect } from "next/navigation";

import getPlaylist from "@/actions/get-playlist";
import { Heading } from "@/components/heading";
import { PlaylistClient } from "./playlist-client";

interface PlaylistPageProps {
  params: {
    playlistId: string;
  };
}

export const metadata: Metadata = {
  title: "Next Music | Playlist",
};

const PlaylistPage = async ({ params }: PlaylistPageProps) => {
  const playlist = await getPlaylist(params.playlistId);

  if (!playlist) {
    redirect("/");
  }

  return (
    <div className="p-4 page-container no-scrollbar lg:p-6">
      <Heading
        title={playlist.name}
        description="manage your playlist."
      />
      <PlaylistClient playlist={playlist} />
    </div>
  );
};
export default PlaylistPage;
