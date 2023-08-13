import getSongById from "@/actions/get-song";
import { SongForm } from "@/components/forms/song-form";
import { Heading } from "@/components/heading";

interface SongPageProps {
  params: {
    songId: string;
  };
}

const SongPage = async ({ params }: SongPageProps) => {
  const song = await getSongById(params.songId);

  return (
    <div className="h-full p-4 overflow-y-scroll rounded-md bg-neutral-900 lg:p-6">
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
