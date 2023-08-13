"use client";

import { MouseEventHandler } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Image } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  onChange: (url: string) => void;
  disabled?: boolean;
}

export const ImageUploader = ({ onChange, disabled }: ImageUploaderProps) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
      options={{
        maxFiles: 1,
        clientAllowedFormats: ["image"],
      }}
      onUpload={onUpload}
    >
      {({ open }) => {
        const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
          e.preventDefault();
          open();
        };

        return (
          <Button
            variant="secondary"
            size="sm"
            onClick={handleClick}
            disabled={disabled}
          >
            <Image className="w-4 h-4 mr-2" /> Upload Image
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};
