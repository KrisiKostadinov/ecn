"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import useImageStore from "@/app/dashboard/images/_stores/image";
import UploadPreview from "@/app/dashboard/images/_components/upload-preview";
import Sorting from "@/app/dashboard/images/_components/sorting";

type PageHeaderProps = {
  length: number;
};

export default function PageHeader({ length }: PageHeaderProps) {
  const { setOpen: setImageOpen } = useImageStore();

  const onUpload = () => {
    setImageOpen();
  };

  return (
    <>
      <div className="w-full flex max-sm:flex-col max-sm:items-start max-sm:mb-5 justify-between items-center">
        <div className="text-2xl font-semibold my-5 mx-6 text-gray-600 flex gap-5">
          <span>Изображения ({length})</span>
          <div className="hidden sm:block">
            <Sorting />
          </div>
        </div>
        <Button onClick={onUpload} className="flex max-sm:w-full">
          <PlusIcon />
          <span>Качване</span>
        </Button>
        <UploadPreview />
        <div className="block sm:hidden w-full mt-5">
          <Sorting />
        </div>
      </div>
    </>
  );
}
