"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { Image as PrismaImage } from "@prisma/client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import useImageModalStore from "@/app/dashboard/_components/_stores/image-modal-store";
import ImageModal from "@/app/dashboard/_components/image-modal";

type UploadFeaturedImageProps = {
  id: string;
  featuredImage: PrismaImage | null;
};

export default function UploadFeaturedImage({
  id,
  featuredImage,
}: UploadFeaturedImageProps) {
  const { isOpen, toggleOpen } = useImageModalStore();

  const onConfirm = (selectedImages: PrismaImage[]) => {
    console.log(selectedImages);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Предна снимка</CardTitle>
        {featuredImage ? (
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || "Featured image"}
            width={featuredImage.width || 300}
            height={featuredImage.height || 300}
            className="w-full h-full"
            priority
          />
        ) : (
          <ImageIcon
            className="w-40 h-40 text-gray-600"
            onClick={toggleOpen}
          />
        )}
      </CardHeader>
      <ImageModal dialogTitle="Избиране на предна снимка" callback={onConfirm} />
    </Card>
  );
}
