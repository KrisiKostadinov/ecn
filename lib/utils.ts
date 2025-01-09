import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function jsonToCsv(jsonData: any[]): string {
  if (!jsonData.length) return "";

  const headers = Array.from(
    new Set(jsonData.flatMap((obj) => Object.keys(obj)))
  );

  const csvRows = jsonData.map((row) =>
    headers.map((field) => JSON.stringify(row[field] ?? "")).join(",")
  );

  return [headers.join(","), ...csvRows].join("\n");
}

export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatPrice(
  amount: number,
  locale: string = "bg-BG",
  currency: string = "BGN"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}