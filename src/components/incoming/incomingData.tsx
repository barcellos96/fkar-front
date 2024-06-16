"use client";

import { useContext, useEffect, useState } from "react";
import {
  BadgeDollarSign,
  Banknote,
  BookType,
  CalendarCheck,
  CalendarDays,
  Eye,
  Map,
  Pencil,
  Plus,
  Text,
  Trash,
  TrendingDown,
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
import { GetIncomingProps, IncomingContext } from "@/providers/incoming";
import { Modal } from "../modals";

export default function IncomingData() {
  const { push } = useRouter();

  const handleSubmit = () => {
    push("/dashboard/receitas/criar");
  };
  const { GetIncomingType, incomingType, GetIncoming, incomingData, value } =
    useContext(IncomingContext);
  const { selectedVehicleId } = useContext(VehicleContext);

  const [onModal, setOnModal] = useState(false);
  const [loading, setLoading] = useState(false); // Estado de loading para o useEffect
  const [eyeOn, setEyeOn] = useState(false);
  const [selectedIncoming, setSelectedIncoming] =
    useState<GetIncomingProps | null>(null);

  useEffect(() => {
    setLoading(true); // Inicia o estado de loading

    Promise.all([GetIncoming(), GetIncomingType()]).finally(() => {
      setLoading(false); // Finaliza o estado de loading
    });
  }, [value, selectedVehicleId]);

  const filteredIncomingByVehicle = incomingData?.filter(
    (incoming) => incoming.vehicle.id === selectedVehicleId
  );

  if (!incomingData || !incomingType || !filteredIncomingByVehicle) {
    return <TableSkeleton />; // Mostra o skeleton enquanto carrega
  }

  if (filteredIncomingByVehicle?.length === 0) {
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

  const openEyeOn = (item: GetIncomingProps) => {
    setEyeOn(true);
    setSelectedIncoming(item);
  };
  const handleCloseEyeOn = () => setEyeOn(false);

  function formatDateTime(dateString: string) {
    // Crie um objeto Date a partir da string fornecida
    const date = new Date(dateString);

    // Extrair componentes da data e hora
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Janeiro é 0!
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Formatar no formato desejado
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  const handleOpenModal = (item: GetIncomingProps) => {
    console.log("item ", item);
    setOnModal(true);
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
          filteredIncomingByVehicle.length > 0 &&
          filteredIncomingByVehicle.map((item, index) => (
            <tr
              className="flex flex-col slg:table-row border-b px-2 py-4 slg:px-0 slg:py-0 gap-1 "
              key={index}
            >
              <td className="py-3 hidden slg:table-cell">{index + 1}</td>

              <td className="slg:py-3 ">
                <section className="slg:hidden absolute flex gap-2  justify-end w-4/5">
                  <button
                    className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                    onClick={() => openEyeOn(item)}
                  >
                    <Eye width={15} color="white" />
                  </button>
                  <button
                    className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                    onClick={() => handleOpenModal(item)}
                  >
                    <Pencil width={15} color="white" />
                  </button>
                  <button
                    className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                  >
                    <Trash width={15} color="white" />
                  </button>
                </section>
                <span className="flex gap-2 slg:table-cell">
                  <CalendarDays width={17} height={17} className="slg:hidden" />
                  {format(parseISO(item.date), "dd/MM/yyyy - HH:mm")}
                </span>
              </td>
              <td className="slg:py-3">
                <span className="flex gap-2 slg:table-cell">
                  <TrendingDown width={17} height={17} className="slg:hidden" />
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
                  R$ {item.amount_received}
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
                  onClick={() => openEyeOn(item)}
                >
                  <Eye width={15} color="white" />
                </button>
                <button
                  className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                  onClick={() => handleOpenModal(item)}
                >
                  <Pencil width={15} color="white" />
                </button>
                <button
                  className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                >
                  <Trash width={15} color="white" />
                </button>
              </td>

              {eyeOn && (
                <td>
                  {eyeOn && (
                    <Modal.Root
                      onClose={handleCloseEyeOn}
                      justify="justify-end"
                      items=""
                      rounded=""
                      width="w-full slg:max-w-[430px]"
                      maxheigth="h-full"
                      px=""
                      py=""
                    >
                      <div className="px-4 py-5 flex-grow ">
                        <Modal.Title
                          icon={TrendingUp}
                          title={selectedIncoming?.title ?? ""}
                          onClose={handleCloseEyeOn}
                        />
                        <div className="pr-7">
                          <div className="flex flex-col xlg:flex-row gap-10 xlg:justify-between justify-start border-b py-12">
                            <section className="flex items-center gap-2">
                              <CalendarCheck width={26} height={26} />
                              <section className="flex flex-col">
                                <span className="font-semibold text-lg">
                                  Data:
                                </span>
                                <span className="text-lg font-light">
                                  {formatDateTime(
                                    selectedIncoming?.date
                                      ? selectedIncoming?.date
                                      : ""
                                  )}
                                </span>
                              </section>
                            </section>

                            <section className="flex items-center gap-2">
                              <Map width={26} height={26} />
                              <section className="flex flex-col">
                                <span className="font-semibold text-lg">
                                  Hodometro(km):
                                </span>
                                <span className="text-lg font-light">
                                  {formatKm(
                                    selectedIncoming?.km
                                      ? selectedIncoming?.km
                                      : Number("")
                                  )}
                                </span>
                              </section>
                            </section>
                          </div>

                          <div className="flex flex-col xlg:flex-row gap-10 xlg:justify-between justify-start border-b py-12">
                            <section className="flex items-center gap-2">
                              <BookType width={26} height={26} />
                              <section className="flex flex-col">
                                <span className="font-semibold text-lg">
                                  Tipo de Receita:
                                </span>
                                <span className="text-lg font-light">
                                  {selectedIncoming?.incoming_type.name}
                                </span>
                              </section>
                            </section>

                            <section className="flex items-center gap-2">
                              <Text width={26} height={26} />
                              <section className="flex flex-col">
                                <span className="font-semibold text-lg">
                                  Observação:
                                </span>
                                <span className="text-lg font-light">
                                  {selectedIncoming?.observation}
                                </span>
                              </section>
                            </section>
                          </div>
                        </div>
                      </div>

                      {/* final */}
                      <div className=" bg-green-700 gap-4 flex items-center w-full py-4 px-3  rounded-t-lg ">
                        <Banknote
                          width={40}
                          height={40}
                          className="text-white"
                        />
                        <section className="flex flex-col">
                          <span className="font-light text-md text-white">
                            Total
                          </span>
                          <span className="text-xl font-bold text-white">
                            R$ {selectedIncoming?.amount_received}
                          </span>
                        </section>
                      </div>

                      {/* <div className="bg-blue-300 flex flex-1 w-full"></div>
                    <div className="bg-red-300 flex flex-1 w-full"></div> */}
                    </Modal.Root>
                  )}
                </td>
              )}
            </tr>
          ))}
      </IncomingLayout>
    </>
  );
}
