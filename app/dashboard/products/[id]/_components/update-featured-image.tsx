"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Image as PrismaImage } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import useImageModalStore from "@/app/dashboard/_components/_stores/image-modal-store";
import ImageModal from "@/app/dashboard/_components/image-modal";
import { updateFeaturedImage } from "@/app/dashboard/products/[id]/_actions";

// Типизация на пропсовете
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

  const onConfirm = async (selectedImages: PrismaImage[]) => {
    const result = await updateFeaturedImage(productId, selectedImages[0].id);

    if (!result.success) {
      return toast.error(result.error || "Нещо се обърка");
    }

    router.refresh();
    toast.success("Снимката беше запазена");
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
      <CardFooter className="p-4">
        <button
          onClick={toggleOpen}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Избери снимка
        </button>
      </CardFooter>

      <ImageModal
        dialogTitle="Избиране на предна снимка"
        max={1}
        callback={onConfirm}
      />
    </Card>
  );
}