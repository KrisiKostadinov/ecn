import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { Gender, Role } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body) {
            return NextResponse.json({ message: "Липсва тяло на заявката" }, { status: 400 });
        }

        const { email, password, gender } = body;

        if (!email || !password || !gender) {
            return NextResponse.json({ message: "Имейл адресът, паролата и полът са задължителни" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            return NextResponse.json({ message: "Имейл адресът, който сте въвели е зает" }, { status: 409 });
        }

        const validGenderValues: Gender[] = ["MALE", "FEMALE", "NOT_AVAILABLE"];

        if (!validGenderValues.includes(gender)) {
            return NextResponse.json({ message: "Невалиден пол" }, { status: 400 });
        }

        const usersCount = await prisma.user.count();
        const roleAs: Role = usersCount === 0 ? "ADMIN" : "USER";

        const passwordHash = await bcryptjs.hash(password, 12);

        const newUser = await prisma.user.create({
            data: {
                email: email as string,
                passwordHash: passwordHash as string,
                gender: gender as Gender,
                roleAs: roleAs as Role,
            }
        });

        const { passwordHash: _, ...userWithoutPassword } = newUser;

        return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error) {
        console.log("[USERS/REGISTER]:", error);
        return NextResponse.json({ message: "Сървърна грешка" }, { status: 500 });
    }
}
