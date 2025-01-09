"use server";

import { prisma } from "@/db/prisma";

export async function updateName(id: string, name: string) {
  if (!name) {
    return { success: false, error: "Името на продукта е задължително" };
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: { name }
  });

  if (!name) {
    return { success: false, error: "Името на продукта е задължително" };
  }

  return { success: true, updatedProduct };
}

export async function updateSlug(id: string, slug: string) {
  if (!slug) {
    return { success: false, error: "URL адресът на продукта е задължителен" };
  }

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (product) {
    return { success: false, error: "URL адресът вече е зает от друг продукт" };
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: { slug }
  });

  if (!slug) {
    return { success: false, error: "URL адресът на продукта е задължително" };
  }

  return { success: true, updatedProduct };
}
