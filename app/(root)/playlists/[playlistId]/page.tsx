import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

import getPlaylist from "@/actions/get-playlist";
import { Heading } from "@/components/heading";
import { PlaylistClient } from "./playlist-client";

interface PlaylistPageProps {
  params: {
    playlistId: string;
  };
}

export const generateMetadata = async (
  { params }: PlaylistPageProps,
  parent?: ResolvingMetadata
): Promise<Metadata> => {
  const playlist = await getPlaylist(params.playlistId);
  return {
    title: `Next Music | ${playlist?.name}`,
  };
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
