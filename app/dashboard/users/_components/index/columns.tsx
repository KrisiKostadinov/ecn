"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Gender, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Мапване на полове
const genderMap: { [key in Gender]: string } = {
    MALE: "Мъжки",
    FEMALE: "Женски",
    NOT_AVAILABLE: "Не е определено",
};

// Интерфейс за типизация на отговорите от API-то
interface DeleteResponse {
    status: number;
    message?: string;
}

// Колони за таблицата
export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
    },
    {
        accessorKey: "email",
        header: "Имейл",
    },
    {
        accessorKey: "gender",
        header: "Пол",
        cell: ({ row }) => {
            return genderMap[row.getValue("gender") as Gender];
        },
    },
    {
        accessorKey: "emailConfirmed",
        header: "Потвърден",
        cell: ({ row }) => {
            return row.getValue("emailConfirmed") ? "Да" : "Не";
        },
    },
    {
        accessorKey: "actions",
        header: "Опции",
        cell: ({ row }) => {
            const router = useRouter();

            const onDelete = async (id: string) => {
                try {
                    const response = await axios.delete<DeleteResponse>(`/api/users/delete?id=${id}`);
                    if (response.status === 200) {
                        router.refresh();
                        toast.success("Изтриването беше успешно");
                    }
                } catch (error: any) {
                    if (error?.response?.data?.message) {
                        return toast.error(error.response.data.message);
                    }
                    if (error?.status === 404) {
                        return toast.error("Не е намерен потребителят");
                    }
                    toast.error("Нещо се обърка");
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onDelete(row.getValue("id"))}>
                            Изтриване
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
