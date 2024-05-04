import LayoutDashboard from "@/components/layout/layoutDashboard";
import ProfileLayout from "@/components/profile";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function Profile() {
  return (
    <LayoutDashboard>
      <ProfileLayout />
    </LayoutDashboard>
  );
}
