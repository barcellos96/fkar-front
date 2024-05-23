"use client";

import { useContext, useEffect } from "react";
import RefulingLayout from ".";
import { ExpenseVehicleContext } from "@/providers/expense/expenseVehicle";
import { ExpenseTypeContext } from "@/providers/expense/expenseType";
import TableSkeleton from "../tablesNotData/skeleton";
import { Pencil, Trash } from "lucide-react";
import { formatKm } from "@/hooks/km";
import { format, parseISO } from "date-fns";

export default function RefuelingData() {
  const { GetExpenseVehicle, expenseVehicle } = useContext(
    ExpenseVehicleContext
  );
  const { GetExpenseType, expenseType } = useContext(ExpenseTypeContext);

  useEffect(() => {
    if (expenseType === null) {
      GetExpenseType();
    }
  }, []);

  useEffect(() => {
    if (expenseType) {
      expenseType?.map((item) => {
        if (item.name.toLowerCase() === "abastecimento") {
          if (expenseVehicle === null) {
            GetExpenseVehicle(item.id);
          }
        }
      });
    }
  }, [expenseType]);

  return (
    <>
      {!expenseVehicle ? (
        <TableSkeleton />
      ) : (
        <RefulingLayout>
          {expenseVehicle.map((item, index) => (
            <tr key={index}>
              <td className="py-3">{index + 1}</td>
              <td className="py-3 ">
                {format(parseISO(item.date), "dd/MM/yyyy HH:mm")}
              </td>
              <td className="py-3 ">{item.fuel_type}</td>
              <td className="py-3 ">R$ {item.price_liters}</td>
              <td className="py-3 ">{item.fuel_liters}</td>
              <td className="py-3 ">R$ {item.amount}</td>
              <td className="py-3 hidden lg:table-cell">{formatKm(item.km)}</td>
              <td className="hidden  slg:flex gap-2 py-4 px-2  justify-end">
                <button
                  className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                >
                  <Pencil width={15} color="white" />
                </button>
                <button
                  className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                >
                  <Trash width={15} color="white" />
                </button>
              </td>
            </tr>
          ))}
        </RefulingLayout>
      )}
    </>
  );
}
