import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  toggleOpen: () => void;
}

const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useSidebarStore;
