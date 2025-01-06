import { Metadata } from "next";

import PageHeader from "@/app/dashboard/_components/page-header";
import { prisma } from "@/db/prisma";
import UsersList from "@/app/dashboard/users/_components/UsersList";
import HeaderMoreOptions from "./_components/header-more-options";

export const metadata: Metadata = {
  title: "Users",
};

export default async function Users() {
  const users = await prisma.user.findMany();

  return (
    <div className="flex-1 mr-5">
      <div className="flex items-center">
        <PageHeader title={`Users (${users.length})`} />
        <HeaderMoreOptions />
      </div>
      <UsersList users={users} />
    </div>
  );
}