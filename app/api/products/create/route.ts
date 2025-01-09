import { NextResponse } from "next/server";

import { prisma } from "@/db/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
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

    const body = await req.json();

    if (!body) {
      return NextResponse.json(
        { message: "Липсва тяло на заявката" },
        { status: 400 }
      );
    }

    const { name, slug } = body;

    {
      const product = await prisma.product.findUnique({ where: { slug } });

      if (product) {
        return NextResponse.json(
          { message: "Въведеният 'URL адрес' вече съществува" },
          { status: 400 }
        );
      }
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.log("[PRODUCTS/CREATE]:", error);
    return NextResponse.json({ message: "Сървърна грешка" }, { status: 500 });
  }
}
