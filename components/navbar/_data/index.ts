import { HomeIcon, UserIcon, LogInIcon, MenuIcon } from "lucide-react";

export interface NavbarRoute {
  href: string;
  label: string;
  Icon: React.ComponentType; // Използвай ComponentType вместо LucideIcon
}

export const guestRoutes: NavbarRoute[] = [
  {
    label: "Вход",
    href: "/sign-in",
    Icon: LogInIcon, // Предай директно компонента
  },
];

export const loggedInRoutes: NavbarRoute[] = [
  {
    label: "Моят акаунт",
    href: "/account",
    Icon: UserIcon,
  },
];

export const navbarRoutes: NavbarRoute[] = [
  {
    label: "Начало",
    href: "/",
    Icon: HomeIcon,
  },
  {
    label: "Моят акаунт",
    href: "/my-account",
    Icon: UserIcon,
  },
  {
    label: "Количка",
    href: "/cart",
    Icon: MenuIcon,
  },
];
