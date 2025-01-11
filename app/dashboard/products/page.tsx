import { Metadata } from "next";

import { prisma } from "@/db/prisma";
import { Product } from "@prisma/client";
import PageHeader from "@/app/dashboard/_components/page-header";
import { DataTable } from "@/app/dashboard/products/_components/index/data-table";
import { columns } from "@/app/dashboard/products/_components/index/columns";
import HeaderMoreOptions from "@/app/dashboard/products/_components/header-more-options";

export const metadata: Metadata = {
  title: "Продукти",
};

async function getData(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    include: {
      images: {
        include: {
          image: true,
        },
      },
    },
  });

  return products;
}

export default async function ProductsPage() {
  const data = await getData();

  return (
    <div className="flex-1 mx-5 overflow-x-auto w-[400px]">
      <PageHeader
        title={`Продукти (${data.length})`}
        buttonLink="/dashboard/products/create"
        buttonText="Добавяне"
      >
        <HeaderMoreOptions />
      </PageHeader>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
