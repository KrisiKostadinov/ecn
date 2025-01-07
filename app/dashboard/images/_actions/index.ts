"use server";

import fs from "fs";
import path from "path";

import { ImageProps } from "@/app/dashboard/images/_components/upload-preview";
import { prisma } from "@/db/prisma";

export async function uploadImage(props: ImageProps) {
  if (!props.file) {
    return { success: false, message: "Няма избрано изображение" };
  }

  const uploadDir = path.join(process.cwd(), "public/uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, props.file.name);
  const fullname = "uploads/" + Date.now() + "_" + props.file.name;

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