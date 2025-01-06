import { ReactNode } from "react";

import Sidebar from "@/app/dashboard/_components/sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative flex">
      <Sidebar />
      {children}
    </div>
  );
}
