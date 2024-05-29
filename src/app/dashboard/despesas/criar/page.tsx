import ExpenseVehicleCreate from "@/components/expenses/expenseVehicle/expenseVehicleCreate";
import LayoutDashboard from "@/components/layout/layoutDashboard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Despesa - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function RefuelingCreate() {
  return (
    <LayoutDashboard>
      <ExpenseVehicleCreate />
    </LayoutDashboard>
  );
}
