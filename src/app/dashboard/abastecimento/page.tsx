import LayoutDashboard from "@/components/layout/layoutDashboard";
import RefuelingData from "@/components/expenses/refueling/refuelingData";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abastecimento - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function Refueling() {
  return (
    <LayoutDashboard>
      <RefuelingData />
    </LayoutDashboard>
  );
}
