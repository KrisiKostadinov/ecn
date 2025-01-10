import { create } from "zustand";

interface ImageModalStore {
  isOpen: boolean;
  toggleOpen: () => void;
}

const useImageModalStore = create<ImageModalStore>((set) => ({
  isOpen: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useImageModalStore;
