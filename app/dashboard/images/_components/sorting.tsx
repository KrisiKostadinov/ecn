"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sortMap = {
  asc: "Възходящ ред",
  desc: "Низходящ ред",
};

export default function Sorting() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSort = (sort: "asc" | "desc") => {
    router.push("/dashboard/images?sort=" + sort);
  };

  return (
    <DropdownMenu>
      <Button variant={"outline"} asChild className="w-full">
        <DropdownMenuTrigger>
          {sortMap[searchParams.get("sort") as "asc" as "desc" || "desc"]}
        </DropdownMenuTrigger>
      </Button>
      <DropdownMenuContent align="center" className="w-full">
        <DropdownMenuItem onClick={() => onSort("desc")}>
          Низходящ ред
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort("asc")}>
          Възходящ ред
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
