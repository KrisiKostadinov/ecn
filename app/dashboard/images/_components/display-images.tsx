"use client";

import Image from "next/image";

import { Image as PrismaImage } from "@prisma/client";

type DisplayImageGalleryProps = {
  images: PrismaImage[];
};

export default function DisplayImageGallery({
  images,
}: DisplayImageGalleryProps) {

  const onOpen = (id: string) => {
    console.log("onOpen: ", id);
  };

  return (
    <>
      {images.length ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {images.map((image, index) => (
            <div
              key={index}
              className="bg-gray-100 w-full h-[200px] max-w-full max-h-[200px] border rounded-lg relative group overflow-hidden"
              onClick={() => onOpen(image.id)}
            >
              <Image
                src={`/${image.url}`}
                alt={image.alt || "Image"}
                width={image.width || 400}
                height={image.height || 300}
                className="h-full object-cover transition duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded py-4 px-5 bg-gray-200">
          Няма добавени изображения
        </div>
      )}
    </>
  );
}
