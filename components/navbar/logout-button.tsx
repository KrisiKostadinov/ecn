"use client";

import { FormEvent } from "react";
import { LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { logoutAction } from "@/components/navbar/actions";

type LogoutButtonProps = {
  className?: string;
};

export default function LogoutButton({ className }: LogoutButtonProps) {
  const handleLogout = async (event: FormEvent) => {
    event.preventDefault();
    await logoutAction();
  };

  return (
    <form onSubmit={handleLogout}>
      <Button type="submit" variant={"ghost"} className={className}>
        <LogOutIcon />
        Logout
      </Button>
    </form>
  );
}