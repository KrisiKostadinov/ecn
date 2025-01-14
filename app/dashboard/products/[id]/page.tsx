import { Metadata } from "next";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

import { prisma } from "@/db/prisma";
import PageHeader from "@/app/dashboard/_components/page-header";

import UpdateFeaturedImage from "@/app/dashboard/products/[id]/_components/update-featured-image";
import UpdateNameForm from "@/app/dashboard/products/[id]/_components/update-name-form";
import UpdateSlugForm from "@/app/dashboard/products/[id]/_components/update-slug-form";
import UpdateOriginalPriceForm from "@/app/dashboard/products/[id]/_components/update-original-price-form";
import UpdateSellingPriceForm from "@/app/dashboard/products/[id]/_components/update-selling-price-form";
import UpdateMetaTitleForm from "@/app/dashboard/products/[id]/_components/update-meta-title-form";
import UpdateDescriptionForm from "@/app/dashboard/products/[id]/_components/update-description-form";
import UpdateMetaDescriptionForm from "@/app/dashboard/products/[id]/_components/update-meta-description-form";
import UpdateMetaKeywordsForm from "@/app/dashboard/products/[id]/_components/update-meta-keywords-form";
import UpdateQuantityForm from "@/app/dashboard/products/[id]/_components/update-quantity-form";
import UpdateAddionalImages from "@/app/dashboard/products/[id]/_components/update-additional-images";

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

  const productFeaturedImage = await prisma.productImage.findFirst({
    where: {
      productId: product.id,
      place: "FEATURED",
    },
    include: {
      image: true,
    },
  });

  const productAdditionalImages = await prisma.productImage.findMany({
    where: {
      productId: product.id,
      place: "ADDITIONAL",
    },
    include: {
      image: true,
    },
  });

  const productImages = productAdditionalImages.map((x) => x.image);

  return (
    <div className="flex-1 mx-5 mb-5">
      <div className="flex justify-between items-center">
        <PageHeader title="Редактиране на продукта" />
      </div>

      <div className="flex max-lg:flex-col gap-5">
        <UpdateFeaturedImage
          productId={product.id}
          featuredImage={productFeaturedImage?.image ?? null}
        />
        <UpdateAddionalImages
          productId={product.id}
          images={productImages}
        />
      </div>

      <div className="text-xl font-semibold my-5">Име</div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <UpdateNameForm id={product.id} name={product.name} />
        <UpdateSlugForm id={product.id} slug={product.slug} />
      </div>

      <div className="text-xl font-semibold my-5">Описание</div>
      <div>
        <UpdateDescriptionForm id={product.id} description={product.description} />
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

      <div className="text-xl font-semibold my-5">Количество</div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <UpdateQuantityForm id={product.id} quantity={product.quantity} />
      </div>

      <div className="text-xl font-semibold my-5">SEO</div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <UpdateMetaTitleForm id={product.id} metaTitle={product.metaTitle} />
        <UpdateMetaDescriptionForm
          id={product.id}
          metaDescription={product.metaDescription}
        />
        <UpdateMetaKeywordsForm
          id={product.id}
          metaKeywords={product.metaKeywords}
        />
      </div>
    </div>
  );
}
