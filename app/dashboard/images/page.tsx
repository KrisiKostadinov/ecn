import { Metadata } from "next";

import { prisma } from "@/db/prisma";
import { columns } from "@/app/dashboard/images/_components/index/columns";
import { DataTable } from "@/app/dashboard/images/_components/index/data-table";
import HeaderMoreOptions from "@/app/dashboard/images/_components/index/header-more-options";
import UploadButton from "@/app/dashboard/images/_components/index/upload-button";
import UploadPreview from "./_components/upload-preview";

export const metadata: Metadata = {
  title: "Изображения",
};

type GetDataProps = {
  orderBy: "asc" | "desc";
};

async function getData({ orderBy }: GetDataProps) {
  const data = await prisma.image.findMany({ orderBy: { createdAt: orderBy } });
  return data;
}

type ImagesPageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ImagesPage({ searchParams }: ImagesPageProps) {
  const params = await searchParams;

  const orderBy = params?.sort ? (params.sort as "asc" as "desc") : "desc";

  const data = await getData({ orderBy });

  return (
    <div className="flex-1 mx-5 overflow-x-auto">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="text-2xl font-semibold my-5 text-gray-600">Изображения ({data.length})</div>
          <HeaderMoreOptions />
        </div>
        <UploadButton />
      </div>
      <DataTable columns={columns} data={data} />
      <UploadPreview />
    </div>
  );
}