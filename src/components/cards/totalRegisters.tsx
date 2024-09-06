"use client";

import { useContext, useEffect } from "react";
import { ExpenseVehicleContext } from "@/providers/expense/expenseVehicle";
import { parseCookies } from "nookies";
import { VehicleContext } from "@/providers/vehicle/vehicle";

export default function TotalRegisterMonth() {
  const { FilteredListAll, filteredListAll } = useContext(
    ExpenseVehicleContext
  );
  const { vehicle } = useContext(VehicleContext);

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

  const formatDateQuery = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const { start_date, end_date } = getCurrentMonthDates();

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

  const totalRegisters = filteredListAll?.total;

  return (
    <div
      className={`flex flex-col bg-white justify-between items-center mt-2 rounded-lg shadow-md py-4 gap-4`}
    >
      <span className="text-sm slg:text-base lgg:text-lg font-bold">
        TOTAL REGISTROS
      </span>

      <span className="text-xl slg:text-lg lgg:text-xl">{totalRegisters}</span>
    </div>
  );
}
