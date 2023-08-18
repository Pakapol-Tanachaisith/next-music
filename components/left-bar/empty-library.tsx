import Image from "next/image";

export const EmptyLibrary = () => {
  return (
    <div className="flex justify-center h-full pt-10">
      <div className="text-center">
        <p className="mb-8 text-sm text-muted-foreground">No uploaded songs</p>
        <Image
          src="/assets/empty-library.svg"
          width={230}
          height={180}
          alt=""
          className="opacity-20 grayscale"
        />
      </div>
    </div>
  );
};
