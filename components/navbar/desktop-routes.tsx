import { headers } from "next/headers";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import LogoutButton from "@/components/navbar/logout-button";
import {
  guestRoutes,
  loggedInRoutes,
  navbarRoutes,
} from "@/components/navbar/_data";
import { auth } from "@/lib/auth";

type DesktopRoutesProps = React.HTMLAttributes<HTMLDivElement>;

export default async function DesktopRoutes(props: DesktopRoutesProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div {...props}>
      {navbarRoutes.map((route, index) => (
        <Link href={route.href} key={index}>
          <Button type="button" variant={"ghost"}>
            {route.label}
          </Button>
        </Link>
      ))}
      {!session ? (
        guestRoutes.map((route, index) => (
          <Link
            href={route.href}
            className={buttonVariants({ variant: "ghost" })}
            key={index}
          >
            {route.label}
          </Link>
        ))
      ) : (
        <>
          {loggedInRoutes.map((route, index) => (
            <Link href={route.href} key={index}>
              <Button type="button" variant={"ghost"}>
                {route.label}
              </Button>
            </Link>
          ))}
          <LogoutButton />
        </>
      )}
    </div>
  );
}
