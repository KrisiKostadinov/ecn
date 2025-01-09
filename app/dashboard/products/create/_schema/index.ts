"use client";

import * as zod from "zod";

export const ProductSchema = zod.object({
  name: zod
    .string({ message: "Името на продукта е задължително" })
    .min(1, { message: "Името на продукта е задължително" })
    .max(255, { message: "Името трябва да бъде до 255 символа" }),
  slug: zod
    .string({ message: "URL адресът на продукта е задължително" })
    .min(1, { message: "URL адресът на продукта е задължително" })
    .max(255, { message: "Slug трябва да бъде до 255 символа" }),
  description: zod.string().nullable().optional(),
  originalPrice: zod.coerce.number().nullable().optional(),
  sellingPrice: zod.coerce.number().nullable().optional(),
  quantity: zod.coerce.number().int().nullable().optional(),
  metaTitle: zod
    .string()
    .max(70, { message: "Meta title трябва да бъде до 70 символа" })
    .nullable()
    .optional(),
  metaDescription: zod
    .string()
    .max(160, { message: "Meta description трябва да бъде до 160 символа" })
    .nullable()
    .optional(),
  metaKeywords: zod
    .string()
    .max(1000, { message: "Meta keywords трябва да бъде до 1000 символа" })
    .nullable()
    .optional(),
});

export type ProductFormValues = zod.infer<typeof ProductSchema>;
