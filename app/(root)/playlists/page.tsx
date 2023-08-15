import type { Metadata } from "next";

import { Heading } from "@/components/heading";
import { PlaylistsClient } from "./playlists-client";
import { auth } from "@clerk/nextjs";
import getUserPlaylists from "@/actions/get-user-playlists";

export const metadata: Metadata = {
  title: "Next Music | Playlists",
};

const PlaylistsPage = async () => {
  const { userId } = auth();
  const playlists = await getUserPlaylists(userId);

  return (
    <div className="h-full p-4 overflow-y-scroll rounded-md bg-neutral-900 lg:p-6">
      <Heading title="My Playlists" />
      <PlaylistsClient playlists={playlists} />
    </div>
  );
};
export default PlaylistsPage;
