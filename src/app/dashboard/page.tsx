import FinanceSummary from "@/components/cards/financeSummary";
import TotalRegisterMonth from "@/components/cards/totalRegisters";
import TotalRevenueMonth from "@/components/cards/totalRevenue";
import UpdatePlanCard from "@/components/cards/updatePlanCard";
import ButtonFloatDashboard from "@/components/dashboard/buttonFloatDashboard";
import UpdateKmModal from "@/components/dashboard/updateKmModal";
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
      <div className="grid lg:grid-cols-dashUpLg gap-6 overflow-hidden -ml-2">
        <div className="lg:hidden mt-7 ms-2 -mb-8">
          <UpdatePlanCard />
          <ReminderTimeline />
          <FinanceSummary />
        </div>
        <HistoryTimeline />
        <div>
          <div className="hidden lg:block ">
            <UpdatePlanCard />
            <ReminderTimeline />
            <FinanceSummary />
            <section className="grid grid-cols-2 gap-2">
              <TotalRegisterMonth />
              <TotalRevenueMonth />
            </section>
          </div>
        </div>
        <ButtonFloatDashboard />
        <UpdateKmModal />
      </div>
    </LayoutDashboard>
  );
}
