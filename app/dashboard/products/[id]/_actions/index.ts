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

  if (!updatedProduct) {
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

  if (!updatedProduct) {
    return { success: false, error: "URL адресът на продукта е задължително" };
  }

  return { success: true, updatedProduct };
}

export async function updateOriginalPrice(id: string, originalPrice: number) {
  if (!originalPrice) {
    return { success: false, error: "Цената на продукта е задължителна" };
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: { originalPrice }
  });

  if (!updatedProduct) {
    return { success: false, error: "Цената на продукта е задължителна" };
  }

  return { success: true, updatedProduct };
}

export async function updateSellingPrice(id: string, sellingPrice: number) {
  if (!sellingPrice) {
    return { success: false, error: "Промоцията на продукта е задължителна" };
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: { sellingPrice }
  });

  if (!updatedProduct) {
    return { success: false, error: "Промоцията на продукта е задължителна" };
  }

  return { success: true, updatedProduct };
}