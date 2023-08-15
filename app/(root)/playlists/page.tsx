import { Plus } from "lucide-react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";

const PlaylistsPage = () => {
  return (
    <div className="h-full p-4 overflow-y-scroll rounded-md bg-neutral-900 lg:p-6">
      <Heading title="My Playlists" />
      <section className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">0 Playlists</h3>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create
          </Button>
        </div>
        <Empty
          message="No Playlist Found."
          imagePath="/assets/playlist.svg"
        />
      </section>
    </div>
  );
};
export default PlaylistsPage;
