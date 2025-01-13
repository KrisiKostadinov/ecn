"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import LogoutButton from "@/components/navbar/logout-button";
import { Button } from "@/components/ui/button";
import {
  guestRoutes,
  loggedInRoutes,
  navbarRoutes,
} from "@/components/navbar/_data";

export default function NavbarSheetMobileDialog({ session }: { session: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex">
      <Button variant={"outline"} size={"icon"} onClick={() => setIsOpen(true)}>
        <MenuIcon />
      </Button>
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <SheetContent side={"right"} className="p-0">
          <SheetHeader>
            <SheetTitle className="text-left mt-5 mb-2 ml-5">
              Навигация
            </SheetTitle>
            <Separator />
            <SheetDescription
              asChild
              id="sidebar-right-routes"
              className="flex flex-col"
            >
              <div>
                {navbarRoutes.map((route, index) => (
                  <Link
                    href={route.href}
                    key={index}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      type="button"
                      variant={"ghost"}
                      className="w-full justify-start"
                    >
                      <route.Icon />
                      {route.label}
                    </Button>
                  </Link>
                ))}
                {!session ? (
                  <>
                    {guestRoutes.map((route, index) => (
                      <Link
                        href={route.href}
                        key={index}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          type="button"
                          variant={"ghost"}
                          className="w-full justify-start"
                        >
                          <route.Icon />
                          {route.label}
                        </Button>
                      </Link>
                    ))}
                  </>
                ) : (
                  <>
                    {loggedInRoutes.map((route, index) => (
                      <Link
                        href={route.href}
                        key={index}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          type="button"
                          variant={"ghost"}
                          className="w-full justify-start"
                        >
                          <route.Icon />
                          {route.label}
                        </Button>
                      </Link>
                    ))}
                    <div onClick={() => setIsOpen(false)}>
                      <LogoutButton className="w-full justify-start" />
                    </div>
                  </>
                )}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
