import { Metadata } from "next";

import PageHeader from "@/app/dashboard/images/_components/page-header";
import { prisma } from "@/db/prisma";

export const metadata: Metadata = {
  title: "Изображения",
};

async function getData() {
  const data = await prisma.image.findMany();
  return data;
}

export default async function ImagesPage() {
  const data = await getData();

  return (
    <div className="flex-1 mx-5">
      <div className="flex justify-between items-center">
        <PageHeader length={data.length} />
      </div>
    </div>
  );
}
