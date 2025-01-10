"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
import AlertMessage from "@/app/dashboard/_components/alert-message";

type ImageModalProps = {
  dialogTitle: string;
  max?: number;
  callback: Function;
};

export default function ImageModal({
  dialogTitle,
  max = 1,
  callback,
}: ImageModalProps) {
  const {
    isOpen,
    pageImages,
    page,
    totalPages,
    toggleOpen,
    prevPage,
    nextPage,
    fetchImages,
  } = useImageModalStore();
  const [selectedImages, setSelectedImages] = useState<PrismaImage[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  const isImageSelected = (id: string) =>
    selectedImages.some((x) => x.id === id);

  const onConfirm = () => {
    callback(selectedImages);
    setSelectedImages([]);
    toggleOpen();
  };

  const onCancel = () => {
    setSelectedImages([]);
    toggleOpen();
  };

  const onImageSelect = (id: string) => {
    const selectedImage = pageImages.find((x) => x.id === id);

    if (selectedImage) {
      if (!isImageSelected(id)) {
        if (selectedImages.length >= max) {
          toast.error(`Можете да изберете само до ${max} снимки.`);
          return;
        }

        setSelectedImages((prev) => [...prev, selectedImage]);
      } else {
        setSelectedImages((prev) => prev.filter((x) => x.id !== id));
      }
    } else {
      toast.error("Тази снимка не може да бъде намерена");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen} modal>
      <DialogContent className="min-w-[90%] max-w-[1200px] mx-auto h-auto p-6 rounded-md shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{dialogTitle}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-2">
            Изберете до {max} {max === 1 ? "снимка" : "снимки"} ({selectedImages.length} избрани)
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 h-[600px] overflow-y-auto">
          {pageImages.length ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {pageImages.map((imageItem) => (
                  <Card
                    key={imageItem.id}
                    className={cn(
                      "rounded overflow-hidden transition border cursor-pointer hover:shadow-md",
                      isImageSelected(imageItem.id) && "border-blue-500"
                    )}
                  >
                    <Image
                      src={`/${imageItem.url}`}
                      alt={imageItem.alt || ""}
                      width={imageItem.width || 300}
                      height={imageItem.height || 300}
                      className={cn(
                        "h-[150px] w-full object-cover transition-transform",
                        isImageSelected(imageItem.id) && "scale-95"
                      )}
                      onClick={() => onImageSelect(imageItem.id)}
                    />
                  </Card>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6">
                <Button onClick={prevPage} disabled={page === 1}>
                  Предишна страница
                </Button>
                <span className="text-gray-600">
                  Страница {page} от {totalPages}
                </span>
                <Button onClick={nextPage} disabled={page === totalPages}>
                  Следваща страница
                </Button>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-32">
              <AlertMessage
                title="Няма намерени снимки"
                message="Към този момент можете само да качите нови снимки, които да използвате."
              />
            </div>
          )}
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Button onClick={onConfirm} className="bg-blue-500 text-white">
            Потвърждаване
          </Button>
          <Button variant={"outline"} onClick={onCancel}>
            Отказ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}