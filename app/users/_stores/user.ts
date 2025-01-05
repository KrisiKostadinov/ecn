import { create } from "zustand";

import { User } from "@prisma/client";

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user: User) => set(() => ({ user })),
}));

export default useUserStore;
