"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useNavbarStore from "@/components/navbar/_stores";
import { Separator } from "@/components/ui/separator";
import { NavbarRightRoutesProps, navbarRoutes } from "@/components/navbar/_data";
import { cn } from "@/lib/utils";

export default function NavbarRightRoutes() {
  const { isOpen, toggleOpen } = useNavbarStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <Sheet open={isOpen} onOpenChange={toggleOpen}>
        <SheetContent side={"right"} className="p-0">
          <SheetHeader>
            <SheetTitle className="text-left mt-5 mb-2 ml-5">
              Навигация
            </SheetTitle>
            <Separator />
            <SheetDescription id="sidebar-right-routes">
              {navbarRoutes.map((route) => (
                <NavbarIconRoute key={route.href} {...route} />
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}

function NavbarIconRoute({ href, label, icon: Icon }: NavbarRightRoutesProps) {
  const pathname = usePathname();
  const { toggleOpen } = useNavbarStore();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "h-full flex items-center gap-5 rounded hover:bg-gray-100 py-2 px-4",
        isActive && "bg-gray-100"
      )}
      onClick={toggleOpen}
    >
      <Icon size={26} />
      <span>{label}</span>
    </Link>
  );
}
