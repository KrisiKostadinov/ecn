import {
  CircleUser,
  Home,
  LucideIcon,
  ShoppingCart,
  UserIcon,
} from "lucide-react";

export interface NavbarRightRoutesProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const navbarRoutes: NavbarRightRoutesProps[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/users/login", label: "Login", icon: CircleUser },
  { href: "/users/my-account", label: "My Account", icon: UserIcon },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
];