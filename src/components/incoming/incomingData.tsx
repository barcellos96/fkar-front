"use client";

import { useContext, useEffect, useState } from "react";
import {
  BadgeDollarSign,
  CalendarDays,
  Eye,
  Map,
  Pencil,
  Plus,
  Trash,
  TrendingUp,
} from "lucide-react";
import { formatKm } from "@/hooks/km";
import { format, parseISO } from "date-fns";
import { VehicleContext } from "@/providers/vehicle/vehicle";
import TableSkeleton from "@/components/tablesNotData/skeleton";
import { LoadingSpinner } from "@/components/loading";
import { NotDataTable } from "@/components/tablesNotData";

import IconExpense from "../../assets/expenses.png";
import { useRouter } from "next/navigation";
import IncomingLayout from ".";
import { IncomingContext, VehicleProps } from "@/providers/incoming";
import formatNumberWithSpaces from "@/utils/formatCurrencyWhiteSpaces";
import IncomingSelf from "./incomingSelf";
import IncomingDelete from "./incomingDelete";
import IncomingUpdate from "./incomingUpdate";
import formattedDate from "@/utils/formatedDate";

interface GetIncomingProps {
  id: string;
  date: string;
  title: string;
  amount_received: string;
  km: number;
  observation: string;
  incoming_type: {
    id: string;
    name: string;
  };
  vehicle: VehicleProps;
}

export default function IncomingData() {
  const { push } = useRouter();

  const handleSubmit = () => {
    push("/dashboard/receitas/criar");
  };
  const {
    GetIncomingType,
    incomingType,
    GetIncoming,
    incomingData,
    valueIncoming,
  } = useContext(IncomingContext);
  const { selectedVehicleId } = useContext(VehicleContext);

  const [modalDelete, setModalDelete] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalEye, setModalEye] = useState(false);

  const [loading, setLoading] = useState(false); // Estado de loading para o useEffect
  const [selectedIncoming, setSelectedIncoming] =
    useState<GetIncomingProps | null>(null);

  useEffect(() => {
    setLoading(true); // Inicia o estado de loading

    if (selectedVehicleId) {
      Promise.all([GetIncoming(selectedVehicleId), GetIncomingType()]).finally(
        () => {
          setLoading(false); // Finaliza o estado de loading
        }
      );
    }
  }, [valueIncoming, selectedVehicleId]);

  if (!incomingData || !incomingType) {
    return <TableSkeleton />; // Mostra o skeleton enquanto carrega
  }

  if (incomingData.incoming_list?.length === 0) {
    return (
      <div className="flex flex-col mt-3 rounded-lg items-center justify-center pb-5 ">
        <NotDataTable.Root>
          <NotDataTable.Body
            img={IconExpense}
            actionButton={handleSubmit}
            icon={Plus}
            title="Receita"
          />
        </NotDataTable.Root>
      </div>
    );
  }

  const handleCloseModal = () => {
    setModalEye(false);
    setModalDelete(false);
    setModalUpdate(false);
  };

  const handleOpenModalEye = (item: GetIncomingProps) => {
    setModalDelete(true);
    setSelectedIncoming(item);
  };

  const handleOpenModalDelete = (item: GetIncomingProps) => {
    setModalDelete(true);
    setSelectedIncoming(item);
  };

  const handleOpenModalUpdate = (item: GetIncomingProps) => {
    setModalUpdate(true);
    setSelectedIncoming(item);
  };

  return (
    <>
      <IncomingLayout>
        {loading && (
          <tr>
            <td>
              <LoadingSpinner />
            </td>
          </tr>
        )}

        {!loading &&
          incomingData.incoming_list.length > 0 &&
          incomingData.incoming_list.map((item, index) => (
            <tr
              className="flex flex-col slg:table-row border-b px-2 py-4 slg:px-0 slg:py-0 gap-1 "
              key={index}
            >
              <td className="py-3 hidden slg:table-cell">{index + 1}</td>

              <td className="slg:py-3 ">
                <section className="slg:hidden absolute flex gap-2  justify-end w-4/5">
                  <button
                    className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                    onClick={() => handleOpenModalEye(item)}
                  >
                    <Eye width={15} color="white" />
                  </button>
                  <button
                    className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                    onClick={() => handleOpenModalUpdate(item)}
                  >
                    <Pencil width={15} color="white" />
                  </button>
                  <button
                    className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                    onClick={() => handleOpenModalDelete(item)}
                  >
                    <Trash width={15} color="white" />
                  </button>
                </section>
                <span className="flex gap-2 slg:table-cell">
                  <CalendarDays width={17} height={17} className="slg:hidden" />
                  {formattedDate(new Date(item.date))}
                </span>
              </td>
              <td className="slg:py-3">
                <span className="flex gap-2 slg:table-cell">
                  <TrendingUp width={17} height={17} className="slg:hidden" />
                  {item.title}
                </span>
              </td>
              <td className="slg:py-3">
                <span className="flex gap-2 slg:table-cell">
                  <TrendingUp width={17} height={17} className="slg:hidden" />
                  {item.incoming_type.name}
                </span>
              </td>
              <td className="slg:py-3 ">
                <span className="flex gap-2 slg:table-cell">
                  <BadgeDollarSign
                    width={17}
                    height={17}
                    className="slg:hidden"
                  />
                  R$ {formatNumberWithSpaces(item.amount_received)}
                </span>
              </td>
              <td className="flex slg:py-3 slg:table-cell">
                <span className="flex gap-2 slg:table-cell">
                  <Map width={17} height={17} className="slg:hidden" />

                  {formatKm(item.km)}
                </span>
              </td>

              <td className="hidden  slg:flex gap-2 py-4 px-1  justify-end">
                <button
                  className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                  onClick={() => handleOpenModalEye(item)}
                >
                  <Eye width={15} color="white" />
                </button>
                <button
                  className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                  onClick={() => handleOpenModalUpdate(item)}
                >
                  <Pencil width={15} color="white" />
                </button>
                <button
                  className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                  onClick={() => handleOpenModalDelete(item)}
                >
                  <Trash width={15} color="white" />
                </button>
              </td>
            </tr>
          ))}
      </IncomingLayout>
      {modalEye && selectedIncoming && (
        <IncomingSelf handleClose={handleCloseModal} item={selectedIncoming} />
      )}

      {modalDelete && selectedIncoming && (
        <IncomingDelete
          incomingId={selectedIncoming.id}
          handleClose={handleCloseModal}
          item={selectedIncoming}
        />
      )}

      {modalUpdate && selectedIncoming && (
        <IncomingUpdate
          handleClose={handleCloseModal}
          incomingId={selectedIncoming.id}
          item={{
            ...selectedIncoming,
            amount_received: selectedIncoming.amount_received.toString(),
            km: selectedIncoming.km.toString(), // Converter km para string
          }}
        />
      )}
    </>
  );
}
