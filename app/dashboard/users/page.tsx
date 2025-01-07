import { Metadata } from "next";

import { prisma } from "@/db/prisma";
import { Gender, Role, User } from "@prisma/client";
import { columns } from "@/app/dashboard/users/_components/index/columns";
import { DataTable } from "@/app/dashboard/users/_components/index/data-table";
import PageHeader from "@/app/dashboard/_components/page-header";
import HeaderMoreOptions from "@/app/dashboard/users/_components/header-more-options";

export const metadata: Metadata = {
  title: "Users",
};

async function getData(): Promise<User[]> {
  const users = await prisma.user.findMany();
  return users.map(user => ({
    ...user,
    emailConfirmed: user.emailConfirmed,
  }));
}

export default async function Users() {
  const data = await getData();

  return (
    <div className="flex-1 mx-5">
      <div className="flex items-center">
        <PageHeader title={`Users (${data.length})`} />
        <HeaderMoreOptions />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}