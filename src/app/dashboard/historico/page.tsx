import FinanceSummary from "@/components/cards/financeSummary";
import UpdatePlanCard from "@/components/cards/updatePlanCard";
import LayoutDashboard from "@/components/layout/layoutDashboard";
import HistoryTimeline from "@/components/timeline/historyTimeline";
import ReminderTimeline from "@/components/timeline/reminderTimeline";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function Dashboard() {
  return (
    <LayoutDashboard>
      <div className="grid lg:grid-cols-dashUpLg gap-6 overflow-hidden -ml-2 ">
        <HistoryTimeline />
      </div>
    </LayoutDashboard>
  );
}
