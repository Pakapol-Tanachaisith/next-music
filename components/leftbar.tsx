import { LeftNav } from "./left-nav";
import { Library } from "./library";

interface LeftBarProps {
  userId: string | null;
}

export const LeftBar = ({ userId }: LeftBarProps) => {
  return (
    <div className="hidden lg:flex gap-x-3">
      <LeftNav userId={userId} />
      <Library />
    </div>
  );
};
