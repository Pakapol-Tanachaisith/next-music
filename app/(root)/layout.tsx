import type { Metadata } from "next";
import { auth } from "@clerk/nextjs";

import { BottomBar } from "@/components/bottombar";
import { LeftBar } from "@/components/left-bar";
import { Player } from "@/components/player";

export const metadata: Metadata = {
  title: "Next Music",
  description: "Music app built with NextJS 13",
};

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  return (
    <>
      <div className="relative flex flex-grow h-full lg:p-2 gap-x-6">
        <LeftBar userId={userId} />
        <div className="relative flex flex-col flex-grow h-full pb-16 lg:pb-0">
          <main className="flex-grow h-full overflow-hidden lg:pb-0">
            {children}
          </main>
          <Player />
        </div>
      </div>
      <BottomBar userId={userId} />
    </>
  );
};
export default GeneralLayout;
