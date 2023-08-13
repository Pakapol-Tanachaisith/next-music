import { SongForm } from "@/components/forms/song-form";
import { Heading } from "@/components/heading";

interface SongPageProps {
  songId: string;
}

const SongPage = ({ songId }: SongPageProps) => {
  return (
    <div className="h-full p-4 overflow-y-scroll rounded-md bg-neutral-900 lg:p-6">
      <Heading
        title="Upload Song"
        description="upload a song and share it with the world."
      />
      <section className="mt-10">
        <SongForm />
      </section>
    </div>
  );
};
export default SongPage;
