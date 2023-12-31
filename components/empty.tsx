import Image from "next/image";

interface EmptyProps {
  message: string;
  imagePath?: string;
}

export const Empty = ({
  message,
  imagePath = "/assets/empty.svg",
}: EmptyProps) => {
  return (
    <div className="my-6 border-2 rounded-lg flex items-center justify-center bg-neutral-800/10 h-[450px]">
      <div className="p-4 text-center">
        <div className="relative w-[300px] aspect-square grayscale opacity-20">
          <Image
            src={imagePath}
            fill
            alt=""
          />
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};
