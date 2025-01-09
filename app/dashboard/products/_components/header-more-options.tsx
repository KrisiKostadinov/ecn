"use client";

import { MoreHorizontalIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { jsonToCsv } from "@/lib/utils";
import useUsersTableStore from "@/app/dashboard/users/_stores";
import { genderMap, roleMap } from "@/app/dashboard/users/_types";

export default function HeaderMoreOptions() {
  const { users } = useUsersTableStore();
  const router = useRouter();

  const onDelete = async () => {
    const message =
      "Сигурни ли сте, че искате да изтриете всички продукти. Тази операция е необратима.";
    if (!confirm(message)) return;

    try {
      const response = await axios.delete(`/api/products/delete`);
      if (response.status === 200) {
        toast.success("Изтриването беше успешно");
        router.refresh();
      }
    } catch (error: any) {
      if (error.status === 404) {
        return toast.error("Ресурът не е намерен");
      }
      if (error.response.data.message) {
        return toast.error(error.response.data.message);
      }
      toast.error("Нещо се обърка");
    }
  };

  const downloadCsv = () => {
    const mappedUsers = users.map((user) => {
      return {
        emailConfirmed: user.emailConfirmed ? "Yes" : "No",
        email: user.email,
        gender: genderMap[user.gender],
        roleAs: roleMap[user.roleAs],
      };
    });

    const csvString = jsonToCsv(mappedUsers);
    const bom = '\uFEFF';
    const blob = new Blob([bom + csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "products.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontalIcon
          className="hover:bg-gray-100 rounded p-2"
          size={40}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={downloadCsv}>
          Сваляне на всички (CVS)
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete}>
          Изтриване на всички
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
