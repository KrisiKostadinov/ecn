"use client";

import Link from "next/link";
import { CircleUser, Home, LucideIcon, ShoppingCart, UserIcon } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface NavbarIconRoutesProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navbarRoutes: NavbarIconRoutesProps[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/users/login", label: "Login", icon: CircleUser },
  { href: "/users/my-account", label: "My Account", icon: UserIcon },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
];

export default function NavbarIconRoutes() {
  return (
    <>
      {navbarRoutes.map((route) => (
        <NavbarIconRoute key={route.href} {...route} />
      ))}
    </>
  );
}

function NavbarIconRoute({ href, label, icon: Icon }: NavbarIconRoutesProps) {
  return (
    <Link href={href} className="h-full flex items-center">
      <Tooltip>
        <TooltipTrigger>
            <Icon size={26} />
        </TooltipTrigger>
        <TooltipContent>
          {label}
        </TooltipContent>
      </Tooltip>
    </Link>
  );
}