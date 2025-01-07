"use client";

import { DeleteIcon, ImageIcon, SaveIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useImageStore from "@/app/dashboard/images/_stores";
import { uploadImage } from "@/app/dashboard/images/_actions";

interface FileChangeEvent extends ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & { files: FileList };
}

export type ImageProps = {
  src: string;
  size: number;
  type: string;
  width: number;
  height: number;
  file: File;
};

export default function UploadPreview() {
  const { isOpen, setOpen } = useImageStore();
  const [image, setImage] = useState<ImageProps | null>(null);

  const onUpload = async () => {
    if (!image) {
      toast.error("Няма избрано изображение");
      return;
    }

    const result = await uploadImage(image);
    toast.success("Изображението беше запазено успешно");
    
    setImage(null);
    setOpen();
  };

  const onChange = (event: FileChangeEvent) => {
    const file: File | null = event.target.files ? event.target.files[0] : null;

    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Моля, изберете валиден файл с изображение.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error(
          "Размерът на файла е твърде голям. Максимален размер: 5MB."
        );
        return;
      }

      const fileReader: FileReader = new FileReader();

      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          const img = new window.Image();
          img.onload = () => {
            if (event.target && event.target.result) {
              setImage({
                src: event.target.result as string,
                type: file.type as string,
                size: file.size,
                file,
                width: img.width,
                height: img.height,
              });
              toast.success("Изображението беше заредено успешно");
            }
          };
          img.onerror = () => {
            toast.error("Грешка при зареждане на изображението.");
          };
          if (event.target && event.target.result) {
            img.src = event.target.result as string;
          }
        }
      };

      fileReader.onerror = () => {
        toast.error("Възникна грешка при четене на файла.");
      };

      fileReader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const onDelete = () => {
    setImage(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Качване на ново изпображение</DialogTitle>
          <DialogDescription>
            Можете да качите ново изображение във формат JPG, PNG или GIF. Моля,
            изберете файл от вашето устройство.
          </DialogDescription>
        </DialogHeader>
        <div className="relative h-[300px] border-2 border-dashed">
          {!image ? (
            <>
              <Label
                htmlFor="image"
                className="h-full flex justify-center items-center cursor-pointer"
              >
                <ImageIcon className="w-60 h-60 text-gray-200" />
              </Label>
              <input type="file" id="image" onChange={onChange} hidden />
            </>
          ) : (
            <>
              <Button
                variant={"destructive"}
                size={"icon"}
                className="absolute top-5 right-5 opacity-80"
                onClick={onDelete}
              >
                <DeleteIcon />
              </Button>
              <Image
                className="w-full h-full object-cover"
                src={image.src}
                alt="Image"
                width={300}
                height={300}
                priority
              />
            </>
          )}
        </div>
        {image && (
          <div>
            <DialogTitle className="mb-2">Допълнителна информация</DialogTitle>
            <div>
              Size:{" "}
              {image.size / 1024 < 1024
                ? `${(image.size / 1024).toFixed(0)} KB.`
                : `${(image.size / 1024 / 1024).toFixed(2)} MB.`}
            </div>
            <div>Type: {image.type}</div>
          </div>
        )}
        <div>
          <Button onClick={onUpload}>
            <SaveIcon />
            <span>Запазване</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}