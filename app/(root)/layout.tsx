import { auth } from "@clerk/nextjs";

import { BottomBar } from "@/components/bottombar";
import { LeftBar } from "@/components/leftbar";
import { Player } from "@/components/player";

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  return (
    <>
      <div className="flex flex-grow h-full lg:p-2 gap-x-6">
        <LeftBar userId={userId} />
        <div className="relative flex-grow h-full">
          <main className="h-full overflow-hidden">{children}</main>
          {/* <Player /> */}
        </div>
      </div>
      <BottomBar userId={userId} />
    </>
  );
};
export default GeneralLayout;
