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
import useImageStore from "@/app/dashboard/images/_stores/upload-image";

export default function HeaderMoreOptions() {
  const router = useRouter();
  const { setOpen } = useImageStore();

  const onDelete = async () => {
    if (!confirm("Тази операция ще изтрие всичките изображения, които не са поставени на продукти. Сигурени ли сте, че искате да продължите?")) return;

    const result = await deleteAllImages();

    if (!result.success) {
      return toast.error(result.error);
    }

    if (!result.deletedImages?.length) {
      return toast.error("Няма намерени изображения, които могат да бъдат изтрити.");
    }
    
    toast.success(`Изображенията бяха изтрити успешно (${result.deletedImages?.length})`);
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

        <DropdownMenuItem onClick={setOpen}>
          Качване
        </DropdownMenuItem>

        <DropdownMenuItem>Изпращане на имейл до всички</DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={onDelete}>
          Изтриване на всички
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}