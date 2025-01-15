import { create } from "zustand";

interface UploadMultipleImagesStore {
  isOpen: boolean;
  isLoading: boolean;
  pathnames: Record<string, string>;
  toggleOpen: () => void;
  toggleLoading: () => void;
  setPathnames: (value: Record<string, string>) => void;
}

const useUploadMultipleImagesStore = create<UploadMultipleImagesStore>(
  (set) => ({
    isOpen: false,
    isLoading: false,
    pathnames: {},
    toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    toggleLoading: () => set((state) => ({ isLoading: !state.isLoading })),
    setPathnames: (value: Record<string, string>) => set((state) => ({ pathnames: value })),
  })
);

export default useUploadMultipleImagesStore;
