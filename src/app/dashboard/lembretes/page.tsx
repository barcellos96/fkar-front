import LayoutDashboard from "@/components/layout/layoutDashboard";
import ReminderPageLayout from "@/components/reminder";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lembretes - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function Reminder() {
  return (
    <LayoutDashboard>
      <ReminderPageLayout />
    </LayoutDashboard>
  );
}
