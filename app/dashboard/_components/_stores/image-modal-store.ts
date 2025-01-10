"use client";

import { Image as PrismaImage } from "@prisma/client";
import { create } from "zustand";

interface ImageModalStore {
  isOpen: boolean;
  selectedImages: PrismaImage[];
  pageImages: PrismaImage[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  toggleOpen: () => void;
  setSelectedImages: (value: PrismaImage[]) => void;
  setPageImages: (value: PrismaImage[]) => void;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setImages: (images: PrismaImage[]) => void;
  fetchImages: () => Promise<void>;
}

const useImageModalStore = create<ImageModalStore>((set, get) => ({
  isOpen: false,
  selectedImages: [],
  pageImages: [],
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0,
  isLoading: false,
  error: null,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setSelectedImages: (value: PrismaImage[]) =>
    set(() => ({ selectedImages: value })),
  setPageImages: (value: PrismaImage[]) => set(() => ({ pageImages: value })),
  setPage: (page: number) => set(() => ({ page })),
  nextPage: () => {
    const { page, totalPages } = get();
    if (page < totalPages) {
      set({ page: page + 1 });
      get().fetchImages();
    }
  },
  prevPage: () => {
    const { page } = get();
    if (page > 1) {
      set({ page: page - 1 });
      get().fetchImages();
    }
  },
  setImages: (images: PrismaImage[]) => {
    const { limit } = get();
    set({
      total: images.length,
      totalPages: Math.ceil(images.length / limit),
    });
    const start = (get().page - 1) * limit;
    const end = start + limit;
    set({ pageImages: images.slice(start, end) });
  },
  fetchImages: async () => {
    const { page, limit } = get();
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/images?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error("Неуспешно зареждане на изображенията.");
      }
      const data = await response.json();
      set({
        pageImages: data.images,
        total: data.total,
        totalPages: Math.ceil(data.total / limit),
        isLoading: false,
      });
    } catch (error) {
      set({
        error: (error as Error).message,
        isLoading: false,
      });
    }
  },
}));

export default useImageModalStore;
