"use client";

import {
  LayoutDashboardIcon,
  LucideIcon,
  MenuIcon,
  ShoppingCart,
  StretchHorizontal,
  Users2Icon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import useSidebarStore from "@/app/dashboard/_components/_stores";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarRoute {
  label: string;
  href: string;
  icon: LucideIcon;
}

const sidebarRoutes: SidebarRoute[] = [
  {
    label: "Табло",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    label: "Потребители",
    href: "/dashboard/users",
    icon: Users2Icon,
  },
  {
    label: "Продукти",
    href: "/dashboard/products",
    icon: StretchHorizontal,
  },
  {
    label: "Поръчки",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
];

export default function Sidebar() {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
}

function DesktopSidebar() {
  return (
    <div className="hidden md:block max-w-xs w-full h-screen border-r-2 text-gray-600 border-gray-100 shadow-sm">
      <div className="text-2xl font-semibold text-center my-5">
        Администрация
      </div>
      <Separator />
      <div>
        {sidebarRoutes.map((route, index) => (
          <SidebarRoute {...route} key={index} />
        ))}
      </div>
    </div>
  );
}

function MobileSidebar() {
  const { isOpen, toggleOpen } = useSidebarStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <Button
        className="flex md:hidden absolute top-5 right-5"
        variant={"outline"}
        size={"icon"}
        onClick={toggleOpen}
      >
        <MenuIcon size={26} />
      </Button>
      <Sheet open={isOpen} onOpenChange={toggleOpen}>
        <SheetContent side={"right"} className="p-0">
          <SheetHeader>
            <SheetTitle className="text-left mt-5 mb-2 ml-5">
              Навигация
            </SheetTitle>
            <Separator />
            <SheetDescription id="navbar-right-routes">
              {sidebarRoutes.map((route, index) => (
                <SidebarRoute {...route} key={index} />
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}

function SidebarRoute({ label, href, icon: Icon }: SidebarRoute) {
  const pathname = usePathname();
  const { toggleOpen } = useSidebarStore();

  const isActive = pathname === href;

  const toggle = () => {
    if (window.innerWidth >= 600) return;
    toggleOpen();
  }

  return (
    <Link
      href={href}
      className={cn(
        "h-full flex items-center gap-5 rounded hover:bg-gray-100 py-2 px-4",
        isActive && "bg-gray-100"
      )}
      onClick={toggle}
    >
      <Icon size={26} />
      <span>{label}</span>
    </Link>
  );
}