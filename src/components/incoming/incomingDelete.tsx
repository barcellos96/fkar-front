"use client";

import { Modal } from "@/components/modals";
import { ExpenseVehicleContext } from "@/providers/expense/expenseVehicle";
import { IncomingContext } from "@/providers/incoming";
import formatNumberWithSpaces from "@/utils/formatCurrencyWhiteSpaces";
import { format } from "date-fns";
import {
  BookType,
  CalendarDaysIcon,
  Map,
  MessageSquareText,
} from "lucide-react";
import { useContext, useState } from "react";

interface UpdateExpenseVehicleProps {
  amount_received: string;
  date?: string;
  description?: string;
  incoming_type?: { id: string; name: string };

  km: number;
  location?: string | null;
  observation?: string | null;
  vehicleId?: string;
}

interface DataProps {
  item: UpdateExpenseVehicleProps;
  handleClose: () => void;
  incomingId: string;
}

export default function IncomingDelete({
  handleClose,
  item,
  incomingId,
}: DataProps) {
  const { DeleteIncoming } = useContext(IncomingContext);

  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);

    DeleteIncoming(incomingId).finally(() => {
      setLoading(false);
      handleClose();
    });
  };

  return (
    <Modal.Root onClose={handleClose}>
      <Modal.Title
        title="Receita"
        borderColor="border-green-700"
        onClose={handleClose}
      />

      <div className="uppercase text-base font-light border border-zinc-200 rounded-lg px-2 py-4 flex flex-col gap-3 bg-zinc-100">
        <span className="flex items-center gap-2 text-lg font-semibold">
          {item.description}
        </span>

        {item.date ? (
          <span className="flex items-center gap-2 text-base font-light pb-4">
            <CalendarDaysIcon width={15} height={15} />
            {format(new Date(item.date), "dd/MM/yyyy HH:mm")}
          </span>
        ) : undefined}

        <section className="flex xlg:flex-row gap-2 justify-start items-center border-b pb-4">
          <BookType width={15} height={15} />
          <section className="flex flex-col">
            <span className="font-semibold">Tipo de Receita:</span>
            <span className="font-light">{item?.incoming_type?.name}</span>
          </section>
        </section>

        {item.km ? (
          <span className="flex items-center gap-2">
            <Map width={15} height={15} />
            {formatNumberWithSpaces(item.km)}
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
