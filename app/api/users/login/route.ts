import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import { createSession } from "@/lib/session";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body) {
            return NextResponse.json({ message: "Липсва тяло на заявката" }, { status: 400 });
        }

        const { email, password, rememberMe } = body;

        if (!email || !password || typeof rememberMe !== "boolean") {
            return NextResponse.json({ message: "Имейл адресът, паролата и 'rememberMe' са задължителни" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ message: "Невалидни са имейл адрес или парола" }, { status: 401 });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return NextResponse.json({ message: "Невалидни са имейл адрес или парола" }, { status: 401 });
        }

        const expires = rememberMe ?
            Number(process.env.AUTH_SESSION_EXPIRES) * 1000 :
            Number(process.env.AUTH_SESSION_EXPIRES) * 1000 * 30;
        
        const token = await createSession(
            "auth",
            { userId: user.id, role: user.roleAs },
            expires
        );

        if (!token) {
            return NextResponse.json({ message: "Неуспешно създаване на токен" }, { status: 500 });
        }
        
        const { passwordHash, ...userWithoutPassword } = user;
        return NextResponse.json(userWithoutPassword, { status: 200 });
    } catch (error) {
        console.log("[USERS/LOGIN]:", error);
        return NextResponse.json({ message: "Сървърна грешка" }, { status: 500 });
    }
}
