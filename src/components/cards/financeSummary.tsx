"use client";

import { Fuel, TrendingDown, TrendingUp, Wrench } from "lucide-react";

import DoughnutChart from "../charts/doughnut";
import { useContext, useEffect } from "react";
import { ExpenseVehicleContext } from "@/providers/expense/expenseVehicle";
import { parseCookies } from "nookies";
import formatNumberWithSpaces from "@/utils/formatCurrencyWhiteSpaces";
import formatCurrency from "@/utils/formatCurrency";
import { VehicleContext } from "@/providers/vehicle/vehicle";

export default function FinanceSummary() {
  const { FilteredListAll, filteredListAll } = useContext(
    ExpenseVehicleContext
  );
  const { vehicle } = useContext(VehicleContext);

  console.log("filteredListAll ", filteredListAll?.total);
  const filteredByIncoming = filteredListAll?.filteredData.filter(
    (item) => item.incoming_type
  );

  const totalIncomingAmount =
    filteredByIncoming?.reduce((sum, item) => {
      return sum + parseFloat(item.amount_received);
    }, 0) || 0;

  const filteredByRefueling = filteredListAll?.filteredData.filter(
    (item) => item.expense_type?.name.toLowerCase() === "abastecimento"
  );
  const totalRefuelingAmount =
    filteredByRefueling?.reduce((sum, item) => {
      return sum + parseFloat(item.amount);
    }, 0) || 0;

  const filteredByMaintenance = filteredListAll?.filteredData.filter(
    (item) => item.expense_type?.name.toLowerCase() === "manutenção"
  );
  const totalMaintenanceAmount =
    filteredByMaintenance?.reduce((sum, item) => {
      return sum + parseFloat(item.amount);
    }, 0) || 0;

  const filteredByExpense = filteredListAll?.filteredData.filter(
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

  const { start_date, end_date } = getCurrentMonthDates();

  const formattedStartDate = formatDate(start_date);
  const formattedEndDate = formatDate(end_date);

  const cookies = parseCookies();
  const savedVehicleId = cookies["vehicle:selectedVehicleId"];

  useEffect(() => {
    if (savedVehicleId && vehicle?.length !== 0) {
      FilteredListAll({
        vehicleId: savedVehicleId,
        start_date: start_date,
        end_date: end_date,
      });
    }
  }, [savedVehicleId]);

  const service = totalMaintenanceAmount;
  const expense = totalExpenseAmount;
  const incoming = totalIncomingAmount;
  const fuel = totalRefuelingAmount;

  const total = service + incoming + expense + fuel;

  return (
    <div className="mt-5 pb-3 rounded-xl shadow-lg relative bg-white">
      <h3 className="flex justify-between px-5 py-2 mb-4 font-semibold bg-green-200 rounded-t-lg">
        <span className="text-sm slg:text-lg">
          ÚLTIMO MÊS {`(${formattedStartDate} - ${formattedEndDate})`}
        </span>
        <span className="text-sm slg:text-lg">
          TOTAL: {`${formatCurrency(total)}`}
        </span>
      </h3>
      <div className="flex flex-row items-center justify-around">
        <div className="flex flex-col items-center justify-center">
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
          <h5 className="text-sm font-light mt-1">SERVIÇOS</h5>
          <span className="text-sm slg:text-base font-semibold mt-1">
            {formatCurrency(service)}
          </span>
          <div className="w-16 h-16">
            <DoughnutChart value={service} color="#fcd34d" total={total} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
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
          <div className="w-16 h-16">
            <DoughnutChart value={expense} color="#FF5555" total={total} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
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
          <div className="w-16 h-16">
            <DoughnutChart value={incoming} color="#6CDDA4" total={total} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
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
          <div className="w-16 h-16  ">
            <DoughnutChart value={fuel} color="#fdba74" total={total} />
          </div>
        </div>
      </div>
      {/* <button
        type="button"
        className="bg-green-200 hover:bg-green-300 font-semibold text-sm slg:text-base w-full mx-auto py-2  relative top-5 rounded-b-lg transition duration-300 ease-linear"
      >
        VER RELATORIOS COMPLETOS
      </button> */}
    </div>
  );
}
