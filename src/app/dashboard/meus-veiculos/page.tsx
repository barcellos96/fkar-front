import LayoutDashboard from "@/components/layout/layoutDashboard";
import VehicleData from "@/components/vehicle/vehicleData";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lembretes - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function Vehicle() {
  return (
    <LayoutDashboard>
      <VehicleData />
    </LayoutDashboard>
  );
}
