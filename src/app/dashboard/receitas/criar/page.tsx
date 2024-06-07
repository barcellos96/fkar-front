import IncomingCreate from "@/components/incoming/incomingCreate";
import LayoutDashboard from "@/components/layout/layoutDashboard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Receita - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function IncomingCreatePage() {
  return (
    <LayoutDashboard>
      <IncomingCreate />
    </LayoutDashboard>
  );
}
