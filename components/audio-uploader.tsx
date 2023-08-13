"use client";

import { MouseEventHandler } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Headphones } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AudioUploaderProps {
  onChange: (url: string) => void;
  disabled?: boolean;
}

export const AudioUploader = ({ onChange, disabled }: AudioUploaderProps) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
      options={{
        maxFiles: 1,
        clientAllowedFormats: ["mp3"],
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
            <Headphones className="w-4 h-4 mr-2" />
            Upload Audio
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};
