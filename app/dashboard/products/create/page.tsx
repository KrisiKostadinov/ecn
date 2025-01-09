import { Metadata } from "next";

import PageHeader from "@/app/dashboard/_components/page-header";
import CreateForm from "@/app/dashboard/products/create/_components/create-form";

export const metadata: Metadata = {
  title: "Добавяне на нов продукт",
};

export default async function ProductsPage() {
  return (
    <div className="flex-1 mx-5">
      <div className="flex justify-between items-center">
        <PageHeader title="Добавяне на нов продукт" />
      </div>
      <div className="max-w-md">
        <CreateForm />
      </div>
    </div>
  );
}
