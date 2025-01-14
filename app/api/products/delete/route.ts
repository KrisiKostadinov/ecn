import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      await prisma.productImage.deleteMany({
        where: { productId: id },
      });

      const result = await prisma.product.delete({
        where: { id: id },
      });

      return NextResponse.json(result, { status: 200 });
    } else {
      await prisma.productImage.deleteMany();
      const result = await prisma.product.deleteMany();
      return NextResponse.json(result, { status: 200 });
    }
  } catch (error) {
    console.log("[PRODUCTS/DELETE]:", error);
    return NextResponse.json({ message: "Сървърна грешка" }, { status: 500 });
  }
}
