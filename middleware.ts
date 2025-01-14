import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

type Session = typeof auth.$Infer.Session;

const guestRoutes = ["/sign-in", "/sign-up"];
const loggedInRoutes = ["/dashboard"];

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  const currentRoute = request.nextUrl.pathname;

  const isGuestRoute = guestRoutes.some((x) => x === currentRoute);
  const isLoggedInRoute = loggedInRoutes.some((x) => x === currentRoute);

  if (!session && isLoggedInRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }

  if (session && isGuestRoute) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
