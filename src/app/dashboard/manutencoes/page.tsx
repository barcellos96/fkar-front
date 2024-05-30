import ExpenseMaintenanceData from "@/components/expenses/maintenance/expenseMaintenanceData";
import LayoutDashboard from "@/components/layout/layoutDashboard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manutenções - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function Maintenance() {
  return (
    <LayoutDashboard>
      <ExpenseMaintenanceData />
    </LayoutDashboard>
  );
}
