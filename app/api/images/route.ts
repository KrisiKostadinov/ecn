import { NextResponse } from "next/server";

import { prisma } from "@/db/prisma";
import { getSession } from "@/lib/session";

export async function GET(req: Request) {
  try {
    const session = await getSession("auth");

    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page"));
    const limit = Number(url.searchParams.get("limit"));

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

    const images = await prisma.image.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.image.count();

    return NextResponse.json(
      {
        images,
        total,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[IMAGES/GET]:", error);
    return NextResponse.json({ message: "Сървърна грешка" }, { status: 500 });
  }
}