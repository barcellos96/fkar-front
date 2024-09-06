"use client";

import { useContext, useEffect } from "react";
import { ExpenseVehicleContext } from "@/providers/expense/expenseVehicle";
import { parseCookies } from "nookies";
import formatCurrency from "@/utils/formatCurrency";
import { VehicleContext } from "@/providers/vehicle/vehicle";

export default function TotalRevenueMonth() {
  const { FilteredListAll, filteredListAll } = useContext(
    ExpenseVehicleContext
  );
  const { vehicle } = useContext(VehicleContext);

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

  const getCurrentMonthDates = () => {
    const now = new Date();
    const start_date = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split("T")[0];
    const end_date = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .split("T")[0];
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

  const { start_date, end_date } = getCurrentMonthDates();

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
  }, [savedVehicleId]);

  const service = totalMaintenanceAmount;
  const expense = totalExpenseAmount;
  const incoming = totalIncomingAmount;
  const fuel = totalRefuelingAmount;

  const total = incoming - service - expense - fuel;

  const bgColor =
    total > 0 ? "text-green-400" : total === 0 ? "text-black" : "text-red-400";

  return (
    <div
      className={`flex flex-col bg-white justify-center items-center mt-2 rounded-lg shadow-md py-4 gap-4`}
    >
      <span className="text-sm slg:text-base lgg:text-lg font-bold">
        PERÍODO {formattedStartDate} - {formattedEndDate}
      </span>
      <span className={`${bgColor} text-xl slg:text-lg lgg:text-xl`}>
        {`${formatCurrency(total)}`}
      </span>
    </div>
  );
}
