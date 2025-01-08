"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import useImageStore from "@/app/dashboard/images/_stores";
import UploadPreview from "@/app/dashboard/images/_components/upload-preview";
import Sorting from "@/app/dashboard/images/_components/sorting";

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
      <div className="text-2xl font-semibold my-5 mx-6 text-gray-600 flex gap-5">
        <span>Изображения ({length})</span>
        <div className="hidden sm:block">
          <Sorting />
        </div>
      </div>
      <Button onClick={onUpload} className="hidden sm:block">
        <PlusIcon />
        <span>Качване</span>
      </Button>
      <UploadPreview />
    </div>
  );
}