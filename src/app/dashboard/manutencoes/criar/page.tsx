import LayoutDashboard from "@/components/layout/layoutDashboard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Manutenção - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function MaintenanceCreate() {
  return (
    <LayoutDashboard>
      <h1>Criar manutenção</h1>
    </LayoutDashboard>
  );
}
