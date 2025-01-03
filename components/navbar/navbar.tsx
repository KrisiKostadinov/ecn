"use client";

import Link from "next/link";
import Image from "next/image";
import { MenuIcon } from "lucide-react";

import NavbarIconRoutes from "@/components/navbar/navbar-icon-routes";
import { Button } from "@/components/ui/button";
import useNavbarStore from "@/components/navbar/_stores";
import NavbarRightRoutes from "@/components/navbar/navbar-right-routes";

export default function Navbar() {
  const { toggleOpen } = useNavbarStore();

  return (
    <nav className="h-20 border-b-2 text-gray-600 border-gray-100 shadow-sm max-md:px-4">
      <div className="h-full container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-lg font-bold">
            <Image
              src={"/logo.svg"}
              alt="logo"
              className="w-[140px] h-[60px]"
              width={140}
              height={60}
              priority
            />
          </Link>
        </div>
        <div className="h-full md:flex hidden items-center gap-5">
          <NavbarIconRoutes />
          <NavbarRightRoutes />
        </div>
        <div className="block md:hidden">
          <Button variant={"outline"} size={"icon"} onClick={toggleOpen}>
            <MenuIcon size={26} />
          </Button>
        </div>
      </div>
    </nav>
  );
}