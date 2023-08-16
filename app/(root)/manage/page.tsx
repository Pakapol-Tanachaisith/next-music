import Link from "next/link";
import type { Metadata } from "next";
import { RedirectToSignIn, auth } from "@clerk/nextjs";
import { Plus } from "lucide-react";

import getUserSongs from "@/actions/get-user-songs";
import { Heading } from "@/components/heading";
import { Empty } from "@/components/empty";
import { Button } from "@/components/ui/button";
import { ManageClient } from "./manage-client";

export const metadata: Metadata = {
  title: "Next Music | Manage",
};

const ManagePage = async () => {
  const { userId } = auth();

  if (!userId) return <RedirectToSignIn />;

  const songs = await getUserSongs(userId);

  return (
    <div className="p-4 lg:p-6 page-container no-scrollbar">
      <Heading
        title="Manage Songs"
        description="Manage your uploaded songs."
      />
      <section className="mt-10">
        {songs.length === 0 ? (
          <div>
            <Link href="/songs/new">
              <Button variant="secondary">
                <Plus className="w-4 h-4 mr-2" />
                Upload Song
              </Button>
            </Link>
            <Empty message="You haven't upload any songs." />
          </div>
        ) : (
          <ManageClient songs={songs} />
        )}
      </section>
    </div>
  );
};
export default ManagePage;
