"use client";

import { Fuel, TrendingDown, TrendingUp, Wrench } from "lucide-react";

import DoughnutChart from "../charts/doughnut";
import { useContext, useEffect, useState } from "react";
import { ExpenseVehicleContext } from "@/providers/expense/expenseVehicle";
import { parseCookies } from "nookies";
import formatCurrency from "@/utils/formatCurrency";
import { VehicleContext } from "@/providers/vehicle/vehicle";
import { useRouter } from "next/navigation";
import SelectMonth from "./selectMonthPeriod";
import TotalRegisterMonth from "./totalRegisters";
import TotalRevenueMonth from "./totalRevenue";

export default function FinanceSummary() {
  const { push } = useRouter();
  const { FilteredListAll, filteredListAll } = useContext(
    ExpenseVehicleContext
  );
  const { vehicle } = useContext(VehicleContext);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const filteredByIncoming = filteredListAll?.list?.filter(
    (item) => item.incoming_type
  );

  const totalIncomingAmount =
    filteredByIncoming?.reduce((sum, item) => {
      return sum + parseFloat(item.amount_received);
    }, 0) || 0;

  const filteredByRefueling = filteredListAll?.list?.filter(
    (item) => item.expense_type?.name.toLowerCase() === "abastecimento"
  );
  const totalRefuelingAmount =
    filteredByRefueling?.reduce((sum, item) => {
      return sum + parseFloat(item.amount);
    }, 0) || 0;

  const filteredByMaintenance = filteredListAll?.list?.filter(
    (item) => item.expense_type?.name.toLowerCase() === "manutenção"
  );
  const totalMaintenanceAmount =
    filteredByMaintenance?.reduce((sum, item) => {
      return sum + parseFloat(item.amount);
    }, 0) || 0;

  const filteredByExpense = filteredListAll?.list?.filter(
    (item) =>
      item.expense_type?.name.toLowerCase() !== "manutenção" &&
      item.expense_type?.name.toLowerCase() !== "abastecimento" &&
      !item.incoming_type
  );
  const totalExpenseAmount =
    filteredByExpense?.reduce((sum, item) => {
      return sum + parseFloat(item.amount);
    }, 0) || 0;

  const getCurrentMonthDates = (month: number) => {
    const now = new Date();
    const year = now.getFullYear();
    const start_date = new Date(year, month, 1).toISOString().split("T")[0];
    const end_date = new Date(year, month + 1, 0).toISOString().split("T")[0];
    return { start_date, end_date };
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}`;
  };

  const formatDateQuery = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const { start_date, end_date } = getCurrentMonthDates(selectedMonth);

  const formattedStartDate = formatDate(start_date);
  const formattedEndDate = formatDate(end_date);

  const cookies = parseCookies();
  const savedVehicleId = cookies["vehicle:selectedVehicleId"];

  const queryStartDate = formatDateQuery(start_date);
  const queryEndDate = formatDateQuery(end_date);

  useEffect(() => {
    if (savedVehicleId && vehicle?.length !== 0) {
      FilteredListAll({
        vehicleId: savedVehicleId,
        start_date: queryStartDate,
        end_date: queryEndDate,
      });
    }
  }, [savedVehicleId, selectedMonth]);

  const service = totalMaintenanceAmount;
  const expense = totalExpenseAmount;
  const incoming = totalIncomingAmount;
  const fuel = totalRefuelingAmount;

  const total = service + incoming + expense + fuel;

  return (
    <>
      <SelectMonth
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />

      <section className="grid grid-cols-2 gap-2">
        <TotalRegisterMonth />
        <TotalRevenueMonth />
      </section>

      <div
        className={`${
          !filteredListAll && "hidden"
        } mt-2 pb-3 rounded-xl shadow-lg relative bg-white`}
      >
        <h3 className="flex justify-between px-5 py-2 mb-4 font-semibold bg-green-200 rounded-t-lg">
          <span className="text-sm slg:text-base">
            PERÍODO {formattedStartDate} - {formattedEndDate}
          </span>
        </h3>
        <div className="flex flex-row items-center justify-around">
          {/* manutenção */}
          <div
            className="flex flex-col items-center justify-center"
            onClick={() => push("/dashboard/manutencoes")}
          >
            <Wrench
              style={{
                background: "#fcd34d80",
                color: "#f8ca32",
                padding: 8,
                borderRadius: "20%",
              }}
              height={40}
              width={40}
            />
            <h5 className="text-sm font-light mt-1">MANUTENÇÕES</h5>
            <span className="text-sm slg:text-base font-semibold mt-1">
              {formatCurrency(service)}
            </span>
            {total !== 0 && (
              <div className="w-16 h-16">
                <DoughnutChart value={service} color="#fcd34d" total={total} />
              </div>
            )}
          </div>
          {/* despesas */}
          <div
            className="flex flex-col items-center justify-center"
            onClick={() => push("/dashboard/despesas")}
          >
            <TrendingDown
              style={{
                background: "#FF555580",
                color: "#ff4444",
                padding: 8,
                borderRadius: "20%",
              }}
              height={40}
              width={40}
            />
            <h5 className="text-sm font-light mt-1">DESPESAS</h5>
            <span className="text-sm slg:text-base font-semibold mt-1">
              {formatCurrency(expense)}
            </span>
            {total !== 0 && (
              <div className="w-16 h-16">
                <DoughnutChart value={expense} color="#FF5555" total={total} />
              </div>
            )}
          </div>
          {/* receitas */}
          <div
            className="flex flex-col items-center justify-center"
            onClick={() => push("/dashboard/receitas")}
          >
            <TrendingUp
              style={{
                background: "#6CDDA480",
                color: "#40d68b",
                padding: 8,
                borderRadius: "20%",
              }}
              height={40}
              width={40}
            />
            <h5 className="text-sm font-light mt-1">RECEITAS</h5>
            <span className="text-sm slg:text-base font-semibold mt-1">
              {formatCurrency(incoming)}
            </span>
            {total !== 0 && (
              <div className="w-16 h-16">
                <DoughnutChart value={incoming} color="#6CDDA4" total={total} />
              </div>
            )}
          </div>
          {/* abastecimentos */}
          <div
            className="flex flex-col items-center justify-center"
            onClick={() => push("/dashboard/abastecimento")}
          >
            <Fuel
              style={{
                background: "#fdba7480",
                color: "#f99f3f",
                padding: 8,
                borderRadius: "20%",
              }}
              height={40}
              width={40}
            />
            <h5 className="text-sm font-light mt-1">ABASTEC...</h5>
            <span className="text-sm slg:text-base font-semibold mt-1">
              {formatCurrency(fuel)}
            </span>
            {total !== 0 && (
              <div className="w-16 h-16  ">
                <DoughnutChart value={fuel} color="#fdba74" total={total} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
