import { Metadata } from "next";

import PageHeader from "@/app/dashboard/_components/page-header";
import { prisma } from "@/db/prisma";
import UsersList from "@/app/dashboard/users/_components/UsersList";

export const metadata: Metadata = {
  title: "Users",
};

export default async function Users() {
  const users = await prisma.user.findMany();

  return (
    <div className="flex-1 mr-5">
      <PageHeader title={`Users (${users.length})`} />
      <UsersList users={users} />
    </div>
  );
}