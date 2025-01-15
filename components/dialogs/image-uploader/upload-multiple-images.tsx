"use client";

import { CheckIcon, DeleteIcon, ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

import useUploadMultipleImagesStore from "@/components/dialogs/image-uploader/_stores/use-multiple-upload-images";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/components/dialogs/image-uploader/_actions";

type UploadMultipleImagesProps = {
  title?: string;
  previewButtonText?: string;
  numberOfAllwedImages?: number;
  callback: (pathnames: Record<string, string>) => void;
};

export default function UploadMultipleImages({
  title = "Качване на снимка",
  numberOfAllwedImages = 1,
  previewButtonText = "Избиране от файловата система",
  callback,
}: UploadMultipleImagesProps) {
  const { isOpen, toggleOpen, pathnames, setPathnames, isLoading } =
    useUploadMultipleImagesStore();

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="min-h-[400px] flex flex-col gap-5">
          {Object.keys(pathnames).length === 0 && !isLoading ? (
            <UploadArea
              previewButtonText={previewButtonText}
              numberOfAllwedImages={numberOfAllwedImages}
            />
          ) : (
            <AfterUploadedImages />
          )}
          {isLoading && <LoadingSpinner />}
        </div>
        {Object.keys(pathnames).length > 0 && (
          <DialogFooter>
            <div className="flex gap-5">
              <Button
                onClick={() => {
                  toggleOpen();
                  callback(pathnames);
                  setPathnames({});
                }}
              >
                <CheckIcon />
                <span>Използване</span>
              </Button>
              <Button
                variant={"outline"}
                className="text-destructive"
                onClick={() => {}}
              >
                <DeleteIcon />
                <span>Премахване</span>
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

const AfterUploadedImages = () => {
  const { pathnames } = useUploadMultipleImagesStore();

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {Object.entries(pathnames).map(([key, value], index) => (
          <div
            key={index}
            className="relative w-[150px] h-[100px] border shadow rounded overflow-hidden"
          >
            <Image
              src={`/${value}`}
              alt={`Image-${index}`}
              className="object-cover w-full h-full"
              width={300}
              height={300}
              priority
            />
          </div>
        ))}
      </div>
    </>
  );
};

type UploadAreaProps = {
  previewButtonText: string;
  numberOfAllwedImages: number;
};

const UploadArea = ({ previewButtonText, numberOfAllwedImages }: UploadAreaProps) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  const { setPathnames, toggleLoading, isLoading } =
    useUploadMultipleImagesStore();

  const handleButtonClick = () => {
    const fileInput = document.getElementById("images") as HTMLInputElement;

    if (fileInput) {
      fileInput.click();
    }
  };

  const handleChange = async (event: any) => {
    const images = Array.from(event.target.files) as File[];

    const validationResult = makeValidations(images);
    if (!validationResult) return;

    toggleLoading();

    const promises = images.map(async (file) => {
      try {
        const dimensions = await getImageDimensions(file);
        return uploadImage(file, dimensions.width, dimensions.height);
      } catch (error) {
        return null;
      }
    });

    const uploadedResult = await Promise.all(promises);
    toggleLoading();

    const pathnames: Record<string, string> = uploadedResult.reduce((acc, item) => {
      if (item?.success && item?.id && item.fullname) {
        acc[item.id] = item.fullname;
      }
      return acc;
    }, {} as Record<string, string>);

    setPathnames(pathnames);
  };

  const makeValidations = (images: File[]) => {
    const invalidFiles = images.filter(
      (image) => !allowedTypes.includes(image.type)
    );

    if (invalidFiles.length > 0) {
      toast({
        title: "Грешка!",
        description: "Позволените формати са следните: PNG, JPG и JPEG.",
      });

      return false;
    }

    if (images.length > numberOfAllwedImages) {
      toast({
        title: "Грешка!",
        description: `Не можете да качите повече от ${numberOfAllwedImages} снимки.`,
      });

      return false;
    }

    return true;
  };

  const getImageDimensions = (
    file: File
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(url);
      };

      img.onerror = (error) => {
        reject(new Error("Не може да се зареди изображението."));
      };

      img.src = url;
    });
  };

  return (
    <div className="border-2 border-dashed border-slate-100 w-full h-full">
      <div className="w-full max-w-xs mx-auto h-full flex flex-col justify-center items-center gap-2">
        <form>
          <Button type="button" variant={"outline"} onClick={handleButtonClick}>
            <ImageIcon />
            <span>{previewButtonText}</span>
          </Button>
          <input
            type="file"
            id="images"
            hidden
            onChange={handleChange}
            multiple={numberOfAllwedImages > 1}
          />
        </form>
        <div className="text-center text-muted-foreground">
          Можете да изберете снимки в следните формати: PNG, JPG и JPEG
        </div>
      </div>
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-y-2 border-x-4 border-slate-900"></div>
    </div>
  );
};
