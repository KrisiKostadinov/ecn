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
