"use client";

import { ImageIcon, MoreHorizontal } from "lucide-react";
import NextImage from "next/image";

import { Image } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UploadMultipleImages from "@/components/dialogs/image-uploader/upload-multiple-images";
import useImageModalStore from "@/app/dashboard/_components/_stores/image-modal-store";
import useUploadMultipleImagesStore from "@/components/dialogs/image-uploader/_stores/use-multiple-upload-images";
import { updateAdditionalImages } from "../_actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type UpdateAddionalImagesProps = {
  productId: string;
  images: Image[];
};

export default function UpdateAddionalImages({
  productId,
  images,
}: UpdateAddionalImagesProps) {
  const router = useRouter();
  const cells =
    images.length >= 3
      ? images
      : [...images, ...Array(3 - images.length).fill(null)];

  const onConfirm = async (pathnames: Record<string, string>) => {
    const result = await updateAdditionalImages(productId, pathnames);

    if (!result.success) {
      return toast({
        title: "Грешка!",
        description: result.error || "Нещо се обърка.",
      });
    }

    const successMessage =
      Object.keys(pathnames).length === 1
        ? "Снимката е запазена"
        : "Снимките са запазени";
    toast({
      title: "Успех!",
      description: successMessage,
    });
    router.refresh();
  };

  return (
    <>
      <DisplayCells cells={cells} />
      <UploadMultipleImages
        title="Качване на допълнителни снимки"
        numberOfAllwedImages={10}
        callback={onConfirm}
      />
    </>
  );
}

type DisplayCellsProps = {
  cells: Image[] | null[];
};

const DisplayCells = ({ cells }: DisplayCellsProps) => {
  return (
    <div className="flex flex-wrap items-start gap-2">
      {cells.length &&
        cells.map((cell, index) => <DisplayCell image={cell} key={index} />)}
    </div>
  );
};

type DisplayCellProps = {
  image: Image | null;
};

const DisplayCell = ({ image }: DisplayCellProps) => {
  return (
    <div className="border-2 border-dashed border-slate-200 rounded">
      <DropdownCell image={image} />
    </div>
  );
};

type DropdownCell = {
  image: Image | null;
};

const DropdownCell = ({ image }: DropdownCell) => {
  const { toggleOpen: toggleSelectOpen } = useImageModalStore();
  const { toggleOpen: toggleUploadOpen } = useUploadMultipleImagesStore();

  const onUpload = () => {
    toggleUploadOpen();
  };

  const onSelect = () => {
    toggleSelectOpen();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-[100px] h-[100px] p-1 flex justify-center items-center cursor-pointer overflow-hidden">
          <span className="sr-only">Open menu</span>
          {!image ? (
            <ImageIcon className="text-gray-400 w-10 h-10" />
          ) : (
            <NextImage
              className="w-full h-full object-cover"
              src={`/${image.url}`}
              alt={image.alt || ""}
              width={image.width || 300}
              height={image.height || 300}
              priority
            />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={onSelect}>
          Избиране на снимка
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onUpload}>
          Качване на снимка от устройството
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
