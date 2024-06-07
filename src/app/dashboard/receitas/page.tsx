import IncomingData from "@/components/incoming/incomingData";
import LayoutDashboard from "@/components/layout/layoutDashboard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Receitas - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function Incoming() {
  return (
    <LayoutDashboard>
      <IncomingData />
    </LayoutDashboard>
  );
}
