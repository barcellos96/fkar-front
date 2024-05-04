import HeaderDashboardDefault from "@/components/header/headerDashboardDefault";
import Sidebar from "@/components/sidebar";

import { ReactNode } from "react";

interface LayoutDashboardProps {
  children: ReactNode;
}

export default function LayoutDashboard({ children }: LayoutDashboardProps) {
  return (
    <div className="grid md:grid-cols-app">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="px-2">
        <HeaderDashboardDefault />
        {children}
      </div>
    </div>
  );
}
