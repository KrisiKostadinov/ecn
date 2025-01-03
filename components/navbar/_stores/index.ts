import { create } from 'zustand';

interface NavbarStore {
  isOpen: boolean;
  toggleOpen: () => void;
}

const useNavbarStore = create<NavbarStore>((set) => ({
  isOpen: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useNavbarStore;
