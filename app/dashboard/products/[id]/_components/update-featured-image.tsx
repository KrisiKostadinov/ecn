"use client";

import Image from "next/image";
import { ImageIcon, UploadIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Image as PrismaImage } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import useImageModalStore from "@/app/dashboard/_components/_stores/image-modal-store";
import ImageModal from "@/app/dashboard/_components/image-modal";
import {
  deleteFeaturedImage,
  updateFeaturedImage,
} from "@/app/dashboard/products/[id]/_actions";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import useUploadMultipleImagesStore from "@/components/dialogs/image-uploader/_stores/use-multiple-upload-images";

type UploadFeaturedImageProps = {
  productId: string;
  featuredImage: PrismaImage | null;
};

export default function UploadFeaturedImage({
  productId,
  featuredImage,
}: UploadFeaturedImageProps) {
  const router = useRouter();
  const { toggleOpen } = useImageModalStore();
  const { isOpen, toggleOpen: toggleUploadMultipleImagesOpen } =
    useUploadMultipleImagesStore();

  const onConfirm = async (selectedImages: PrismaImage[]) => {
    const result = await updateFeaturedImage(productId, selectedImages[0].id);

    if (!result.success) {
      return toast.error(result.error || "Нещо се обърка");
    }

    router.refresh();
    toast.success("Снимката беше запазена");
  };

  const deleteImage = async () => {
    if (!featuredImage) {
      return toast.error("Няма запазена снимка на този продукт");
    }

    const result = await deleteFeaturedImage(productId, featuredImage.id);

    if (!result.success) {
      return toast.error(result.error || "Нещо се обърка");
    }

    router.refresh();
    toast.success("Снимката беше премахната");
  };

  return (
    <Card className="h-fit shadow-lg hover:shadow-xl transition-shadow duration-200 rounded-lg">
      <CardHeader className="p-4 border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Предна снимка
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex flex-col items-center">
        {featuredImage ? (
          <div className="relative w-full max-w-sm h-auto rounded-lg overflow-hidden border border-gray-300">
            <Image
              src={`/${featuredImage.url}`}
              alt={featuredImage.alt || "Featured image"}
              width={featuredImage.width || 300}
              height={featuredImage.height || 300}
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div
            onClick={toggleOpen}
            className="flex items-center justify-center w-96 h-40 bg-gray-100 text-gray-600 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <ImageIcon className="w-12 h-12" />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"outline"} onClick={toggleOpen}>
                <ImageIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Избиране на снимка</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"outline"}
                onClick={toggleUploadMultipleImagesOpen}
              >
                <UploadIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Качване на снимка</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {featuredImage && (
          <Button variant={"outline"} onClick={deleteImage}>
            Премахване на снимка
          </Button>
        )}
      </CardFooter>

      <ImageModal
        dialogTitle="Избиране на предна снимка"
        max={1}
        callback={onConfirm}
      />
    </Card>
  );
}
