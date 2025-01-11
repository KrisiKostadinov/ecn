"use client";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";

import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Image, Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

interface DeleteResponse {
  status: number;
  message?: string;
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: () => null,
    cell: () => null,
  },
  {
    accessorKey: "images",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Предна снимка
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const images = row.getValue("images") as Array<{
        place: string;
        image: Image;
      }>;
      const featuredImage = images.find((x) => x.place === "FEATURED");
      const image = featuredImage?.image;
      const url = image?.url;

      if (!url) {
        return "Няма";
      }

      return (
        <NextImage
          src={`/${url}`}
          alt={image.alt || ""}
          width={image.width || 150}
          height={image.height || 150}
          className="w-[100px] h-[80px] object-cover rounded border"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Име на продукта
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Описание
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.getValue("description")
        ? String(row.getValue("description")).substring(0, 399)
        : "Няма";
    },
  },
  {
    accessorKey: "originalPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Редовна Цена
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.getValue("originalPrice")
        ? formatPrice(row.getValue("originalPrice"))
        : "Няма";
    },
  },
  {
    accessorKey: "sellingPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Промоционална Цена
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.getValue("sellingPrice")
        ? formatPrice(row.getValue("sellingPrice"))
        : "Няма";
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Количество
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const quantity = Number(row.getValue("quantity"));
      const fullLabel = `${quantity} ${quantity === 1 ? "брой" : "броя"}`;
      return row.getValue("quantity") ? fullLabel : "Няма";
    },
  },
  {
    accessorKey: "actions",
    header: "Опции",
    cell: ({ row }) => {
      const router = useRouter();

      const onDelete = async (id: string) => {
        try {
          const response = await axios.delete<DeleteResponse>(
            `/api/products/delete?id=${id}`
          );
          if (response.status === 200) {
            router.refresh();
            toast.success("Изтриването беше успешно");
          }
        } catch (error: any) {
          if (error?.response?.data?.message) {
            return toast.error(error.response.data.message);
          }
          if (error?.status === 404) {
            return toast.error("Този ресурс не е намерен");
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
