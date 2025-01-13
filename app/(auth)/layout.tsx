import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-screen flex flex-col items-center">
      {children}
      <Toaster />
    </div>
  );
}
