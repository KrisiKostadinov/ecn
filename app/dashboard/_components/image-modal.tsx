"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Image as PrismaImage } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useImageModalStore from "@/app/dashboard/_components/_stores/image-modal-store";
import { cn } from "@/lib/utils";

type ImageModalProps = {
  dialogTitle: string;
  callback: Function;
};

export default function ImageModal({ dialogTitle, callback }: ImageModalProps) {
  const { isOpen, toggleOpen } = useImageModalStore();
  const [images, setImages] = useState<PrismaImage[]>([]);
  const [selectedImages, setSelectedImages] = useState<PrismaImage[]>([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get("/api/images");
        setImages(response.data);
      } catch (error) {
        toast.error("Нещо се обърка");
      }
    }

    if (isOpen) {
      fetchItems();
    }
  }, [isOpen]);

  const isImageSelected = (id: string) =>
    selectedImages.find((x) => x.id === id);

  const onConfirm = () => {
    callback(selectedImages);
    toggleOpen();
  };

  const onImageSelect = (id: string) => {
    const selectedImage = images.find((x) => x.id === id);

    if (selectedImage) {
      if (!isImageSelected(id)) {
        setSelectedImages((prevSelectedImages) => [
          ...prevSelectedImages,
          selectedImage,
        ]);
      } else {
        const filteredSelectedImages = selectedImages.filter(
          (x) => x.id !== id
        );
        setSelectedImages(filteredSelectedImages);
      }
    } else {
      toast.error("Тази снимка не може да бъде намерена");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen} modal>
      <DialogContent className="min-w-full h-screen">
        <DialogHeader className="space-y-5">
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            {selectedImages.length === 1 ? (
              <>Избрана е: {selectedImages.length} снимка</>
            ) : (
              <>Избрани са: {selectedImages.length} снимки</>
            )}
          </DialogDescription>
          {images.length ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
              {images.map((imageItem) => (
                <Card
                  key={imageItem.id}
                  className={cn(
                    "rounded overflow-hidden transition-transform",
                    isImageSelected(imageItem.id) && "scale-90"
                  )}
                >
                  <Image
                    src={`/${imageItem.url}`}
                    alt={imageItem.alt || ""}
                    width={imageItem.width || 300}
                    height={imageItem.height || 300}
                    priority
                    onClick={() => onImageSelect(imageItem.id)}
                  />
                </Card>
              ))}
            </div>
          ) : (
            <div></div>
          )}
          <div className="flex gap-2">
            <Button onClick={onConfirm}>Потвърждаване</Button>
            <Button variant={"outline"} onClick={toggleOpen}>Отказ</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
