import ExpenseMaintenanceCreate from "@/components/expenses/maintenance/expenseMaintenanceCreate";
import LayoutDashboard from "@/components/layout/layoutDashboard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Manutenção - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function MaintenanceCreate() {
  return (
    <LayoutDashboard>
      <ExpenseMaintenanceCreate />
    </LayoutDashboard>
  );
}
