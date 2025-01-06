import { create } from "zustand";

import { User } from "@prisma/client";

interface UsersTableStore {
  users: User[];
  setUsers: (user: User[]) => void;
  sort: (column: "email") => void;
  sortedBy: string;
  setSortedBy: (column: "email") => void;
}

const useUsersTableStore = create<UsersTableStore>((set) => ({
  users: [],
  sortedBy: "email",
  setUsers: (users: User[]) => set(() => ({ users })),
  sort: (column: "email") =>
    set((state) => ({
      users: [...state.users].sort((a, b) => {
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
        return 0;
      }),
    })),
    setSortedBy: (column: "email") => set(() => ({ sortedBy: column })),
}));

export default useUsersTableStore;
