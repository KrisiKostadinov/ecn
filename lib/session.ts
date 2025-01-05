"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function createSession(name: string, value: any, expires: number) {
    const token = jwt.sign(
        JSON.stringify({ userId: value.userId, role: value.role }),
        process.env.JWT_SECRET || "JWT_SECRET"
    );

    const cookieStore = await cookies();
    cookieStore.set({
        name,
        value: token,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + expires),
    });

    return { success: !!getSession(name) };
}

export async function getSession(name: string) {
    const cookieStore = await cookies();
    const session = cookieStore.get(name);

    if (session?.value) {
        const decoded = jwt.decode(session?.value, { json: true });
        return decoded;
    }

    return null;
}

export async function deleteSession(name: string) {
    const cookieStore = await cookies();
    cookieStore.delete(name);
    return { success: !!getSession(name) };
}