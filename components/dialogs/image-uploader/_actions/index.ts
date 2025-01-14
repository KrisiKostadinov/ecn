"use server";

import { prisma } from "@/db/prisma";
import fs from "fs";
import path from "path";

type CalculateUploadedImagesSizeProps = {
  images: File[];
  returnSizeIn: "kb" | "mb";
};

const calculateUploadedImagesSize = ({
  images,
  returnSizeIn,
}: CalculateUploadedImagesSizeProps): number => {
  if (!images || !Array.isArray(images)) {
    throw new Error("Invalid images input. Expected an array of File objects.");
  }

  if (!["kb", "mb"].includes(returnSizeIn)) {
    throw new Error('Invalid returnSizeIn value. Expected "kb" or "mb".');
  }

  const totalSizeInBytes = images.reduce((acc, image) => acc + image.size, 0);

  const conversionFactor = returnSizeIn === "kb" ? 1024 : 1024 * 1024;
  const sizeInDesiredUnit = totalSizeInBytes / conversionFactor;

  return parseFloat(sizeInDesiredUnit.toFixed(2));
};

type UploadImageResponse = {
  success: boolean;
  fullname: string;
  error?: any;
}

export const uploadImage = async (image: File, width: number, height: number): Promise<UploadImageResponse> => {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');

  const uploadDir = path.join(process.cwd(), "public/uploads", year, month, day);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filename = Date.now() + "_" + image.name;
  const filePath = path.join(uploadDir, filename);
  const fullname = `uploads/${year}/${month}/${day}/` + filename;

  try {
    const fileBuffer = await image.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(fileBuffer));

    const newImage = await prisma.image.create({
      data: {
        name: image.name,
        url: fullname,
        width,
        height,
        size: image.size,
        format: image.type,
      }
    });

    return { success: true, fullname };
  } catch (error) {
    return { success: false, fullname: "", error };
  }
}
