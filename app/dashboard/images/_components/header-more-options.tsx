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
import { deleteAllImages } from "@/app/dashboard/images/_actions";

export default function HeaderMoreOptions() {
  const router = useRouter();

  const onDelete = async () => {
    const result = await deleteAllImages();

    if (!result.success) {
      return toast.error(result.error);
    }

    toast.success("Изображението беше изтрито успешно");
    router.refresh();
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
        <DropdownMenuItem>Изпращане на имейл до всички</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete}>
          Изтриване на всички
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
