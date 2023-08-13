import { auth } from "@clerk/nextjs";
import { LeftNav } from "./left-nav";
import { Library } from "./library";
import getUserSongs from "@/actions/get-user-songs";

export const LeftBar = async () => {
  const { userId } = auth();
  const songs = await getUserSongs(userId);

  return (
    <div className="hidden lg:flex gap-x-3">
      <LeftNav userId={userId} />
      <Library songs={songs} />
    </div>
  );
};
