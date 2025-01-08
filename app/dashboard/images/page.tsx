import { Metadata } from "next";

import PageHeader from "@/app/dashboard/images/_components/page-header";
import { prisma } from "@/db/prisma";
import DisplayImageGallery from "./_components/display-images";

export const metadata: Metadata = {
  title: "Изображения",
};

type GetDataProps = {
  orderBy: "asc" | "desc";
}

async function getData({ orderBy }: GetDataProps) {
  const data = await prisma.image.findMany({ orderBy: { createdAt: orderBy } });
  return data;
}

type ImagesPageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function ImagesPage({ searchParams }: ImagesPageProps) {
  const params = await searchParams;
  
  const orderBy = params?.sort ? params.sort as "asc" as "desc" : "desc";

  const data = await getData({ orderBy });

  return (
    <div className="flex-1 mx-5">
      <div className="flex justify-between items-center">
        <PageHeader length={data.length} />
      </div>
      <DisplayImageGallery images={data} />
    </div>
  );
}
