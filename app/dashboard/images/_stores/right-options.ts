import { create } from "zustand";

interface RightOptionsStore {
  isOpen: boolean;
  setOpen: () => void;
}

const useRightOptionsStore = create<RightOptionsStore>((set) => ({
  isOpen: false,
  setOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useRightOptionsStore;
