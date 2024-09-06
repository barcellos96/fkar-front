import React from "react";
import { Fuel, Wrench, Wallet } from "lucide-react";
import formatNumberWithSpaces from "@/utils/formatCurrencyWhiteSpaces";
import { ListItemProps } from "@/providers/expense/expenseVehicle";

export interface CardProps {
  item: ListItemProps;
  onClick: (item: ListItemProps) => void;
  index: number;
  isLastItem: boolean;
}

const getExpenseIcon = (type: "incoming" | "expense" | string) => {
  switch (type.toLowerCase()) {
    case "manutenção":
      return <Wrench size={18} className="text-amber-300" />;
    case "abastecimento":
      return <Fuel size={18} className="text-orange-300" />;
    case "incoming":
      return <Wallet size={18} className="text-green-300" />;
    default:
      return <Wallet size={18} className="text-red-300" />;
  }
};

function formatTimeBrazil(date: Date): string {
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();

  // Adiciona zero à esquerda se necessário
  const formattedHours: string = hours.toString();
  const formattedMinutes: string = minutes.toString();

  return `${formattedHours}:${formattedMinutes}`;
}

const Card = ({ item, onClick, index, isLastItem }: CardProps) => {
  return (
    <li
      key={index}
      className={`mb-7 ms-9 ${isLastItem ? "last-item" : ""} cursor-pointer`}
      onClick={() => onClick(item)}
    >
      <span
        className={`absolute mt-3 border-r border-dotted border-zinc-300 flex items-center justify-center w-8 h-8 pr-2  -start-2 `}
      >
        {getExpenseIcon(
          item.type === "incoming" ? item.type : item.expense_type?.name || ""
        )}
      </span>

      <section className="flex items-center justify-between">
        {item.type === "expense" ? (
          <div className="flex flex-wrap items-center mb-1 text-base font-semibold text-gray-900">
            <h3 className="flex flex-wrap">{item.description}</h3>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between mb-1 text-base font-semibold text-gray-900">
            <h3 className="flex flex-wrap">{item.title}</h3>
          </div>
        )}

        <span
          className={`flex mb-1 font-medium items-center text-base leading-none ${
            item.type === "incoming" ? "text-green-600" : "text-red-400"
          }`}
        >
          R$ {formatNumberWithSpaces(item.amount ?? item.amount_received ?? 0)}
        </span>
      </section>
      {item.fuel_type && (
        <span className="flex mb-2 text-base items-center leading-none text-gray-400">
          {item.fuel_type}
        </span>
      )}

      {item.date && (
        <span className="flex mb-1 text-base font-light leading-none text-gray-400">
          {formatTimeBrazil(new Date(item.date))}
        </span>
      )}
    </li>
  );
};

export default Card;
