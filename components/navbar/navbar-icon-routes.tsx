"use client";

import Link from "next/link";
import {
    CircleUser,
    Home,
    LucideIcon,
    ShoppingCart,
    UserIcon,
} from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import useUserStore from "@/app/users/_stores/user";

interface NavbarIconRoutesProps {
    href: string;
    label: string;
    icon: LucideIcon;
    availableStatus: "LOGGED_IN" | "USER" | "ADMIN" | "GUEST" | "ALL";
}

const navbarRoutes: NavbarIconRoutesProps[] = [
    { href: "/", label: "Home", icon: Home, availableStatus: "ALL" },
    {
        href: "/users/login",
        label: "Login",
        icon: CircleUser,
        availableStatus: "GUEST",
    },
    {
        href: "/users/my-account",
        label: "My Account",
        icon: UserIcon,
        availableStatus: "LOGGED_IN",
    },
    {
        href: "/cart",
        label: "Cart",
        icon: ShoppingCart,
        availableStatus: "ALL",
    },
];

export default function NavbarIconRoutes() {
    const { user } = useUserStore();
    const isAdmin = user?.roleAs === "ADMIN";
    const isLoggedIn = !!user;

    return (
        <>
            {navbarRoutes
                .filter((route) => {
                    switch (route.availableStatus) {
                        case "ALL":
                            return true;
                        case "GUEST":
                            return !isLoggedIn;
                        case "LOGGED_IN":
                            return isLoggedIn;
                        case "USER":
                            return isLoggedIn && !isAdmin;
                        case "ADMIN":
                            return isAdmin;
                        default:
                            return false;
                    }
                })
                .map((route) => (
                    <div key={route.href}>
                        <NavbarIconRoute {...route} />
                    </div>
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
                <TooltipContent>{label}</TooltipContent>
            </Tooltip>
        </Link>
    );
}