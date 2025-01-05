import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

const protectedRoutesStartsWith = "/dashboard";
const guestRoutes = ["/users/login", "/users/register"];

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isProtectedRoute = path.startsWith(protectedRoutesStartsWith);
    const isGuestRoute = guestRoutes.includes(path);

    const user = await getSession("auth");

    if (!user && isProtectedRoute) {
        return NextResponse.redirect(new URL("/", request.nextUrl));  // Променено на "/" вместо "/users/login"
    }

    if (user && user.role !== "ADMIN" && isProtectedRoute) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (user && isGuestRoute) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
