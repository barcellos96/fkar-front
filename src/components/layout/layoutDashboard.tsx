import Sidebar from "@/components/sidebar";

import { ReactNode } from "react";
import HeaderDashboardDefault from "../header/headerDashboardDefault";

interface LayoutDashboardProps {
  children: ReactNode;
}

export default function LayoutDashboard({ children }: LayoutDashboardProps) {
  return (
    <div className="grid md:grid-cols-app px-1 s:px-3 md:px-0 md:pr-7">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="">
        <HeaderDashboardDefault />
        {children}
      </div>
    </div>
  );
}
