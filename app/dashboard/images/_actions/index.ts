"use server";

import fs from "fs";
import path from "path";

import { ImageProps } from "@/app/dashboard/images/_components/upload-preview";
import { prisma } from "@/db/prisma";

export async function uploadImage(props: ImageProps) {
  if (!props.file) {
    return { success: false, message: "Няма избрано изображение" };
  }

  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');

  const uploadDir = path.join(process.cwd(), "public/uploads", year, month, day);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filename = Date.now() + "_" + props.file.name;
  const filePath = path.join(uploadDir, filename);
  const fullname = `uploads/${year}/${month}/${day}/` + filename;

  try {
    const fileBuffer = await props.file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(fileBuffer));

    const newImage = await prisma.image.create({
      data: {
        name: props.file.name,
        url: fullname,
        width: props.width,
        height: props.height,
        size: props.size,
        format: props.type,
      }
    });

    return { success: true, newImage, fullname };
  } catch (error) {
    return { success: false, error };
  }
}

export async function deleteImage(id: string) {
  if (!id) {
    return { success: false, error: "Невалиден идентификатор на изображение" };
  }

  const prismaImage = await prisma.image.findUnique({ where: { id } });

  if (!prismaImage) {
    return { success: false, error: "Невалиден идентификатор на изображение" };
  }

  const uploadDir = path.join(process.cwd(), "public/");
  const filePath = path.join(uploadDir, prismaImage.url);

  try {
    const result = await prisma.$transaction(async (prisma) => {
      const deletedImage = await prisma.image.delete({ where: { id } });

      if (!deletedImage) {
        throw new Error("Неуспешно изтриване на изображението от базата данни");
      }

      await fs.unlink(filePath, (err) => {
        if (err) throw err;
      });

      return deletedImage;
    });

    return { success: true, deletedImage: result };
  } catch (error) {
    return { success: false, error };
  }
}

export async function deleteAllImages() {
  try {
    const images = await prisma.image.findMany();

    if (!images.length) {
      return { success: false, error: "Няма изображения за изтриване" };
    }

    const results = [];

    for (const image of images) {
      const result = await deleteImage(image.id);
      if (!result.success) {
        throw new Error(`Неуспешно изтриване на изображение с ID: ${image.id}`);
      }
      results.push(result.deletedImage);
    }

    return { success: true, deletedImages: results };
  } catch (error) {
    return { success: false, error };
  }
}