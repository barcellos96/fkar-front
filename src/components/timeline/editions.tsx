"use client";

import RefuelingUpdate from "../expenses/refueling/refuelingUpdate";
import ExpenseMaintenanceUpdate from "../expenses/maintenance/expenseMaintenanceUpdate";
import ExpenseVehicleUpdate from "../expenses/expenseVehicle/expenseVehicleUpdate";
import IncomingUpdate from "../incoming/incomingUpdate";

interface Props {
  item: any;
  onClose?: () => void;
}

export default function Editions({ item, onClose }: Props) {
  return (
    <div className="z-50 absolute bg-white ">
      {onClose &&
        item.type === "expense" &&
        item.expense_type.name.toLowerCase() === "abastecimento" && (
          <RefuelingUpdate
            handleClose={onClose}
            expenseVehicleId={item.id ?? ""}
            item={{
              ...item,
              amount: item.amount.toString(),
              fuel_liters: item.fuel_liters?.toString() ?? null,
              price_liters: item.price_liters?.toString() ?? null,
              km: item.km.toString(), // Converter km para string
            }}
          />
        )}

      {onClose &&
        item.type === "expense" &&
        item.expense_type.name.toLowerCase() === "manutenção" && (
          <ExpenseMaintenanceUpdate
            handleClose={onClose}
            expenseVehicleId={item.id ?? ""}
            item={{
              ...item,
              amount: item.amount.toString(),
              fuel_liters: item.fuel_liters?.toString() ?? null,
              price_liters: item.price_liters?.toString() ?? null,
              km: item.km.toString(), // Converter km para string
            }}
          />
        )}

      {onClose &&
        item.type === "expense" &&
        item.expense_type.name.toLowerCase() !== "manutenção" &&
        item.expense_type.name.toLowerCase() !== "abastecimento" && (
          <ExpenseVehicleUpdate
            handleClose={onClose}
            expenseVehicleId={item.id ?? ""}
            item={{
              ...item,
              amount: item.amount.toString(),
              fuel_liters: item.fuel_liters?.toString() ?? null,
              price_liters: item.price_liters?.toString() ?? null,
              km: item.km.toString(), // Converter km para string
            }}
          />
        )}

      {onClose && item.type === "incoming" && (
        <IncomingUpdate
          handleClose={onClose}
          incomingId={item.id}
          item={{
            ...item,
            amount_received: item.amount_received.toString(),
            km: item.km.toString(), // Converter km para string
          }}
        />
      )}
    </div>
  );
}
