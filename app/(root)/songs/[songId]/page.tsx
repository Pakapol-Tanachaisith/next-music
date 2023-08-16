import type { Metadata } from "next";
import getSongById from "@/actions/get-song";
import { SongForm } from "@/components/forms/song-form";
import { Heading } from "@/components/heading";

export const metadata: Metadata = {
  title: "Next Music | Upload",
};

interface SongPageProps {
  params: {
    songId: string;
  };
}

const SongPage = async ({ params }: SongPageProps) => {
  const song = await getSongById(params.songId);

  return (
    <div className="p-4 page-container no-scrollbar lg:p-6">
      <Heading
        title={song ? "Edit Song" : "Upload Song"}
        description={
          song
            ? "edit your song's information."
            : "upload a song and share it with the world."
        }
      />
      <section className="mt-10">
        <SongForm initialData={song} />
      </section>
    </div>
  );
};
export default SongPage;
