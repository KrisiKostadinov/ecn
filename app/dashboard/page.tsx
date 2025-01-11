import { Metadata } from "next";

import PageHeader from "@/app/dashboard/_components/page-header";

export const metadata: Metadata = {
  title: "Табло",
};

export default async function DashboardPage() {
  return (
    <div className="flex-1 mx-5">
      <div className="flex justify-between items-center">
        <PageHeader title={`Табло`} className="w-full" />
      </div>
    </div>
  );
}