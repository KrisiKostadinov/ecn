import Link from "next/link";
import { AirVent } from "lucide-react";
import { headers } from "next/headers";

import DesktopRoutes from "@/components/navbar/desktop-routes";
import MobileRoutes from "@/components/navbar/mobile-routes";
import { auth } from "@/lib/auth";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="bg-white border-b px-4">
      <div className="flex items-center justify-between mx-auto max-w-4xl h-16">
        <Link href={"/"} className="flex items-center gap-2">
          <AirVent className="w-6 h-6" />
          <span className="font-bold">ecn.</span>
        </Link>
        <DesktopRoutes className="md:flex hidden" />
        <MobileRoutes session={session} />
      </div>
    </div>
  );
}