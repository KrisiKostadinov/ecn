import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

import { getSession } from "@/lib/session";

export async function DELETE(req: Request) {
    try {
        const session = await getSession("auth");
        
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        if (!session || session.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Нямате достъп до този ресурс" },
                { status: 403 }
            );
        }

        if (!session.userId) {
            return NextResponse.json(
                { message: "Нямате достъп до този ресурс" },
                { status: 403 }
            );
        }

        if (id) {
            const result = await prisma.user.delete({
                where: { id: id },
            });
            return NextResponse.json(result, { status: 200 });
        } else {
            const result = await prisma.user.deleteMany({
                where: { NOT: { id: session.userId } },
            });
            return NextResponse.json(result, { status: 200 });
        }
    } catch (error) {
        console.log("[USERS/DELETE]:", error);
        return NextResponse.json(
            { message: "Сървърна грешка" },
            { status: 500 }
        );
    }
}
