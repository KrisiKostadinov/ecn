"use client";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Gender, User } from "@prisma/client";
import { genderMap } from "@/app/dashboard/users/_types";

interface DeleteResponse {
    status: number;
    message?: string;
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: () => null,
        cell: () => null,
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Имейл
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "gender",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Пол
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
        cell: ({ row }) => {
            return genderMap[row.getValue("gender") as Gender];
        },
    },
    {
        accessorKey: "emailConfirmed",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Потвърден
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
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
