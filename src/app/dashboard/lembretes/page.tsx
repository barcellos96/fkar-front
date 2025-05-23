import LayoutDashboard from "@/components/layout/layoutDashboard";
import ReminderData from "@/components/reminder/reminderData";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lembretes - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function Reminder() {
  return (
    <LayoutDashboard>
      <ReminderData />
    </LayoutDashboard>
  );
}
