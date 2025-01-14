import { create } from "zustand";

interface UploadMultipleImagesStore {
  isOpen: boolean;
  isLoading: boolean;
  pathnames: string[];
  toggleOpen: () => void;
  toggleLoading: () => void;
  setPathnames: (value: string[]) => void;
}

const useUploadMultipleImagesStore = create<UploadMultipleImagesStore>(
  (set) => ({
    isOpen: false,
    isLoading: false,
    pathnames: [],
    toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    toggleLoading: () => set((state) => ({ isLoading: !state.isLoading })),
    setPathnames: (value: string[]) => set((state) => ({ pathnames: value })),
  })
);

export default useUploadMultipleImagesStore;
