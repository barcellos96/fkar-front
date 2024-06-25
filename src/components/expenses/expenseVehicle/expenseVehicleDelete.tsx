"use client";

import { Modal } from "@/components/modals";
import { ExpenseVehicleContext } from "@/providers/expense/expenseVehicle";
import formatNumberWithSpaces from "@/utils/formatCurrencyWhiteSpaces";
import { format } from "date-fns";
import {
  BadgeCheck,
  CalendarDaysIcon,
  HandCoins,
  Map,
  MapPin,
  MessageSquareText,
  TrendingDown,
} from "lucide-react";
import { useContext, useState } from "react";

interface UpdateExpenseVehicleProps {
  amount: string;
  date?: string;
  description?: string;
  expense_type?: { id: string; name: string };

  km: string;
  location?: string | null;
  method_payment?: string | null;
  status_payment?: boolean;
  observation?: string | null;
  vehicleId?: string;
}

interface DataProps {
  item: UpdateExpenseVehicleProps;
  handleClose: () => void;
  expenseVehicleId: string;
}

export default function ExpenseVehicleDelete({
  handleClose,
  item,
  expenseVehicleId,
}: DataProps) {
  const { DeleteExpenseVehicle } = useContext(ExpenseVehicleContext);

  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);

    DeleteExpenseVehicle(expenseVehicleId).finally(() => {
      setLoading(false);
      handleClose();
    });
  };

  return (
    <Modal.Root onClose={handleClose}>
      <Modal.Title
        title="Despesa"
        borderColor="border-red-700"
        onClose={handleClose}
      />

      <div className="uppercase text-base font-light border border-zinc-200 rounded-lg px-2 py-4 flex flex-col gap-3 bg-zinc-100">
        <span className="flex items-center  gap-2 text-lg font-semibold">
          {item.description}
        </span>

        {item.date ? (
          <span className="flex items-center gap-2 text-base font-light pb-4">
            <CalendarDaysIcon width={15} height={15} />
            {format(new Date(item.date), "dd/MM/yyyy HH:mm")}
          </span>
        ) : undefined}

        <section className="flex items-start gap-2 pt-6 pb-6 border-b border-t">
          <TrendingDown width={20} height={20} className="mt-1" />
          <section className="flex flex-col w-full">
            <span className="font-semibold text-md mb-2">Tipo de Despesa:</span>
            <span>{item.expense_type?.name}</span>
            <div className="  gap-4 flex items-center justify-between w-full pt-4 px-1">
              <span className="font-semibold  text-md ">Total</span>
              <span className="text-lg font-bold ">
                R$ {formatNumberWithSpaces(item.amount ? item.amount : "")}
              </span>
            </div>
          </section>
        </section>

        {item.km ? (
          <span className="flex items-center gap-2">
            <Map width={15} height={15} />
            {formatNumberWithSpaces(item.km)}
          </span>
        ) : undefined}

        {item.method_payment ? (
          <div className="flex items-center gap-6 pt-6 pb-4">
            <section className="flex items-center gap-2">
              <HandCoins width={15} height={15} />
              <section className="flex flex-col">
                <span className="font-semibold text-lg">
                  Metodo de pagamento:
                </span>
                <span className="text-lg font-light">
                  {item?.method_payment
                    ? item?.method_payment.toUpperCase()
                    : "Nenhum metodo adicionado"}
                </span>
              </section>
            </section>

            <section className="flex items-center gap-2">
              <BadgeCheck width={15} height={15} />
              <section className="flex flex-col">
                <span className="font-semibold text-lg">Status:</span>
                <span className="text-lg font-light">
                  {item?.status_payment ? "Pago" : "Não Pago"}
                </span>
              </section>
            </section>
          </div>
        ) : undefined}

        {item.location ? (
          <span className="flex items-center gap-2">
            <MapPin width={15} height={15} />
            {item.location}
          </span>
        ) : undefined}

        {item.observation ? (
          <span className="flex items-center gap-2">
            <MessageSquareText width={15} height={15} />
            {item.observation}
          </span>
        ) : undefined}
      </div>

      <Modal.Actions
        onSubmitAction={onSubmit}
        loading={loading}
        onCancelAction={handleClose}
        bgColorSubmit="bg-red-700"
        nameButtonSubmit="Excluir"
      />
    </Modal.Root>
  );
}
