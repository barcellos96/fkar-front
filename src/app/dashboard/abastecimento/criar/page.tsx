import LayoutDashboard from "@/components/layout/layoutDashboard";
import ExpenseRefuelingCreate from "@/components/refueling/refuelingCreate";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Abastecimento - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function RefuelingCreate() {
  return (
    <LayoutDashboard>
      <ExpenseRefuelingCreate />
    </LayoutDashboard>
  );
}
