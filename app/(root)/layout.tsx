import { auth } from "@clerk/nextjs";

import { BottomBar } from "@/components/bottombar";
import { LeftBar } from "@/components/leftbar";
import { Player } from "@/components/player";

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  return (
    <div className="flex flex-col h-full overflow-hidden ">
      <div className="flex flex-grow lg:p-2 gap-x-6">
        <LeftBar userId={userId} />
        <div className="flex flex-col flex-grow">
          <main className="flex-grow overflow-y-auto rounded-md bg-neutral-900">
            {children}
          </main>
          {/* <Player /> */}
        </div>
      </div>
      <BottomBar userId={userId} />
    </div>
  );
};
export default GeneralLayout;
