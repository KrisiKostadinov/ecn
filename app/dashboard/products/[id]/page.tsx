import { Metadata } from "next";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

import { prisma } from "@/db/prisma";
import PageHeader from "@/app/dashboard/_components/page-header";
import UpdateNameForm from "@/app/dashboard/products/[id]/_components/update-name-form";
import UpdateSlugForm from "@/app/dashboard/products/[id]/_components/update-slug-form";
import UpdateOriginalPriceForm from "@/app/dashboard/products/[id]/_components/update-original-price-form";
import UpdateSellingPriceForm from "@/app/dashboard/products/[id]/_components/update-selling-price-form";

export const metadata: Metadata = {
  title: "Редактиране на продукта",
};

type UpdateProductPageProps = {
  params: { id: string };
};

export default async function UpdateProductPage({
  params,
}: UpdateProductPageProps) {
  const awaitedParams = await params;

  if (!awaitedParams.id) {
    toast.error("Този продукт не е намерен");
    return redirect("/dashboard/products");
  }

  const product = await prisma.product.findUnique({
    where: { id: awaitedParams.id },
  });

  if (!product) {
    toast.error("Този продукт не е намерен");
    return redirect("/dashboard/products");
  }

  return (
    <div className="flex-1 mx-5">
      <div className="flex justify-between items-center">
        <PageHeader title="Редактиране на продукта" />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <UpdateNameForm id={product.id} name={product.name} />
        <UpdateSlugForm id={product.id} slug={product.slug} />
      </div>
      <div className="text-xl font-semibold my-5">Цена</div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <UpdateOriginalPriceForm
          id={product.id}
          originalPrice={product.originalPrice}
        />
        <UpdateSellingPriceForm
          id={product.id}
          sellingPrice={product.sellingPrice}
          originalPrice={product.originalPrice}
        />
      </div>
    </div>
  );
}