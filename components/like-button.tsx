import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { MouseEvent, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Song } from "@prisma/client";
import { toast } from "react-hot-toast";

interface LikeButtonProps {
  song: Song;
}

export const LikeButton = ({ song }: LikeButtonProps) => {
  const { userId } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onLike = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!userId) return router.push("/sign-in");

    try {
      setLoading(true);
      await axios.patch(`/api/like/${song.id}`);
      router.refresh();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={onLike}
      disabled={loading}
    >
      <Heart
        className={cn(
          "w-5 h-5 text-muted-foreground",
          song?.likedBy.includes(userId || "") && "text-rose-500"
        )}
      />
    </Button>
  );
};
