import { create } from "zustand";
import { User } from "@prisma/client";

interface UsersTableStore {
  users: User[];
  setUsers: (users: User[]) => void;
  sort: (column: "email") => void;
  sortedBy: string;
  setSortedBy: (column: "email") => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;
  paginatedUsers: () => User[];
  totalPages: () => number;
}

const useUsersTableStore = create<UsersTableStore>((set, get) => ({
  users: [],
  sortedBy: "email",
  currentPage: 1,
  itemsPerPage: 3,
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
  setCurrentPage: (page: number) => set(() => ({ currentPage: page })),
  setItemsPerPage: (count: number) => set(() => ({ itemsPerPage: count, currentPage: 1 })),

  paginatedUsers: () => {
    const { users, currentPage, itemsPerPage } = get();
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return users.slice(start, end);
  },

  totalPages: () => {
    const { users, itemsPerPage } = get();
    return Math.ceil(users.length / itemsPerPage);
  },
}));

export default useUsersTableStore;
