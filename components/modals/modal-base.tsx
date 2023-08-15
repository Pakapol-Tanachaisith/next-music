"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalBaseProps {
  isOpen: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  onChange: (open: boolean) => void;
}

export const ModalBase = ({
  children,
  isOpen,
  title,
  description,
  onChange,
}: ModalBaseProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-6">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
