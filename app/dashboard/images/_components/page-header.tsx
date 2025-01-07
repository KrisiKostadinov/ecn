"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import useImageStore from "@/app/dashboard/images/_stores";
import UploadPreview from "./upload-preview";

type PageHeaderProps = {
  length: number;
}

export default function PageHeader({ length }: PageHeaderProps) {
  const { isOpen, setOpen } = useImageStore();

  const onUpload = () => {
    setOpen();
  }

  return (
    <div className="w-full flex justify-between items-center">
      <div className="text-2xl font-semibold my-5 mx-6 text-gray-600">
        Изображения ({length})
      </div>
      <Button onClick={onUpload}>
        <PlusIcon />
        <span>Качване</span>
      </Button>
      <UploadPreview />
    </div>
  );
}