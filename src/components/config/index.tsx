"use client";

import { Crown, Fuel, CreditCard, Car, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import TableTypeExpense from "./expenseType";
import TableSkeleton from "../tablesNotData/skeleton";
import TableIncomingType from "./incomingType";
import TableVehicleType from "./vehicleType";
import TableFuelType from "./fuelType";
import TableExpenseService from "./expenseService";

const tabList = [
  {
    id: 1,
    name: "Planos FKar",
    Icon: Crown,
  },
  {
    id: 2,
    name: "Tipo de Despesa",
    Icon: CreditCard,
  },
  {
    id: 3,
    name: "Tipo de Serviço",
    Icon: Wrench,
  },
  {
    id: 4,
    name: "Tipo de Receita",
    Icon: CreditCard,
  },
  {
    id: 5,
    name: "Tipo de Combustível",
    Icon: Fuel,
  },
  {
    id: 6,
    name: "Tipo de Veículo",
    Icon: Car,
  },
];

export default function ConfigLayout() {
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive("Tipo de Despesa");
  }, []);

  return (
    <div className="grid grid-cols-profileLayoutSm slg:grid-cols-profileLayout py-3 rounded-lg gap-4">
      {/* Left side */}
      <div className="flex flex-col py-5 bg-white my-4 slg:my-0 rounded-xl shadow-lg max-h-72">
        {tabList.map(({ id, name, Icon }) => {
          return (
            <button
              key={id}
              className={`flex items-center px-5  font-light text-base hover:border-l-green-700 hover:border-l-2 hover:bg-green-100 p-3 ${
                active === name && `border-l-green-700 border-l-2 bg-green-100`
              }`}
              onClick={() => setActive(name)}
            >
              <Icon size={14} className="mr-2" /> {name}
            </button>
          );
        })}
      </div>

      {/* Right side */}
      {!active ? (
        <div className="bg-white rounded-xl shadow-lg p-5">
          <TableSkeleton />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-5">
          {active === tabList[0].name && <span>Planos FKar</span>}
          {active === tabList[1].name && <TableTypeExpense title={active} />}
          {active === tabList[2].name && <TableExpenseService title={active} />}
          {active === tabList[3].name && <TableIncomingType title={active} />}
          {active === tabList[4].name && <TableFuelType title={active} />}
          {active === tabList[5].name && <TableVehicleType title={active} />}
        </div>
      )}
    </div>
  );
}
