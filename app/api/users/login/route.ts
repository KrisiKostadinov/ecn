import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import { createSession } from "@/lib/session";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Имейл адресът и паролата са задължителни" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ message: "Невалидни са имейл адрес или парола" }, { status: 401 });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return NextResponse.json({ message: "Невалидни са имейл адрес или парола" }, { status: 401 });
        }

        const token = await createSession(
            "token",
            { userId: user.id, role: user.roleAs },
            Number(process.env.AUTH_SESSION_EXPIRES) * 1000
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
