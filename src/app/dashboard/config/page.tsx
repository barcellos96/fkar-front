import ConfigLayout from "@/components/config";
import LayoutDashboard from "@/components/layout/layoutDashboard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Config - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function Config() {
  return (
    <LayoutDashboard>
      <ConfigLayout />
    </LayoutDashboard>
  );
}
