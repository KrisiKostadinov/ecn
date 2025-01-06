"use client";

import { MoreHorizontalIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function HeaderMoreOptions() {
  const router = useRouter();

  const onDelete = async () => {
    const message =
      "Сигурни ли сте, че искате да изтриете всички потребители. Тази операция е необратима.";
    if (!confirm(message)) return;

    try {
      const response = await axios.delete(`/api/users`);
      if (response.status === 200) {
        toast.success("Изтриването беше успешно");
        router.refresh();
      }
    } catch (error: any) {
      if (error.status === 404) {
        return toast.error("Not found");
      }
      if (error.response.data.message) {
        return toast.error(error.response.data.message);
      }
      toast.error("Нещо се обърка");
    }
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
        <DropdownMenuItem>Сваляне на всички (CVS)</DropdownMenuItem>
        <DropdownMenuItem>Изпращане на имейл до всички</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete}>
          Изтриване на всички
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
