import { create } from "zustand";

interface ImageStore {
    isOpen: boolean;
    setOpen: () => void;
}

const useImageStore = create<ImageStore>((set) => ({
    isOpen: false,
    setOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useImageStore;
