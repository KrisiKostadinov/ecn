import PageHeader from "@/app/dashboard/_components/page-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Продукти"
}

export default async function ProductsPage() {
  const data = [];

  return (
    <div className="flex-1 mx-5">
      <div className="flex justify-between items-center">
        <PageHeader
          title={`Products (${data.length})`}
          buttonLink="/dashboard/products/create"
          buttonText="Добавяне на нов продукт"
          className="w-full"
        />
      </div>
    </div>
  );
}
