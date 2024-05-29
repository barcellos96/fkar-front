import ExpenseVehicleData from "@/components/expenses/expenseVehicle/expenseVehicleData";
import LayoutDashboard from "@/components/layout/layoutDashboard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Despesas - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function Refueling() {
  return (
    <LayoutDashboard>
      <ExpenseVehicleData />
    </LayoutDashboard>
  );
}
