"use client";

import { Car, Pencil, Trash, Wrench } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import TableSkeleton from "../../tablesNotData/skeleton";
import TablePageConfig from "../tablePageConfig/table";
import { Modal } from "@/components/modals";
import { ExpenseServiceContext } from "@/providers/expense/expenseService";
import { VehicleTypeContext } from "@/providers/vehicle/vehicleType";

interface Props {
  title: string;
}

interface ExpenseServiceProps {
  id: string;
  name: string;
  vehicle_types: {
    id: string;
    type: string;
  }[];
}

export default function TableExpenseService({ title }: Props) {
  const {
    GetExpenseService,
    expenseService,
    value,
    DeleteExpenseService,
    UpdateExpenseService,
  } = useContext(ExpenseServiceContext);
  const { GetVehicleType, vehicleType } = useContext(VehicleTypeContext);
  const [onModal, setOnModal] = useState(false);
  const [onModalUpdate, setOnModalUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>(
    []
  );
  const [selectedExpenseService, setSelectedExpenseService] =
    useState<ExpenseServiceProps | null>(null);

  const [modalData, setModalData] = useState({
    name: "",
  });

  const handleCloseModal = () => {
    setOnModal(false);
    setOnModalUpdate(false);
  };

  const handleOpenModal = (item: ExpenseServiceProps) => {
    setModalData({ name: item.name });
    setSelectedExpenseService(item);
    setSelectedVehicleTypes(item.vehicle_types.map((vt) => vt.id)); // Set selected vehicle types

    setOnModal(true);
  };

  useEffect(() => {
    if (vehicleType === null) {
      GetVehicleType();
    }
  }, []);

  useEffect(() => {
    if (expenseService === null) {
      const fetchData = async () => {
        GetExpenseService();
      };

      fetchData();
    }
  }, [value]);

  const typeModal = onModalUpdate ? "Atualizar " : "Deletar ";
  const colorModal = onModalUpdate ? "bg-yellow-600" : "bg-red-700";

  const handleSubmit = () => {
    if (selectedExpenseService) {
      onModalUpdate
        ? UpdateExpenseService({
            expenseServiceId: selectedExpenseService.id,
            name: selectedExpenseService.name,
            vehicleTypeIds: selectedVehicleTypes,
          }).finally(() => {
            setLoading(false);
            handleCloseModal();
          })
        : DeleteExpenseService(selectedExpenseService.id).finally(() => {
            setLoading(false);
            handleCloseModal();
          });
    }
  };

  const handleCheckboxChange = (type: string) => {
    setSelectedVehicleTypes((prevSelected) =>
      prevSelected.includes(type)
        ? prevSelected.filter((item) => item !== type)
        : [...prevSelected, type]
    );
  };

  return (
    <div>
      {!expenseService ? (
        <TableSkeleton />
      ) : (
        <TablePageConfig title={title}>
          {expenseService?.map((item, index) => (
            <tr className="border-b" key={index}>
              <th className="font-normal py-5">{index + 1}</th>
              <th className="font-normal">{item.name}</th>
              <th className="font-normal">
                {item.vehicle_types.map((vehicleType, index) => (
                  <span key={index}>
                    {vehicleType.type}
                    {index < item.vehicle_types.length - 1 && " - "}
                  </span>
                ))}
              </th>
              <th className="flex justify-end py-5 gap-3">
                <button
                  onClick={() => {
                    setOnModalUpdate(true);
                    handleOpenModal(item);
                  }}
                  className={`bg-green-600 } flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                >
                  <Pencil width={15} color="white" />
                </button>
                <button
                  onClick={() => {
                    handleOpenModal(item);
                  }}
                  className={`bg-green-600 } flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                >
                  <Trash width={15} color="white" />
                </button>
                {onModal && selectedExpenseService === item && (
                  <div className="fixed inset-0 z-50 top-0 left-0 h-full w-full flex flex-col items-center justify-center bg-zinc-900 bg-opacity-50">
                    <Modal.Root onClose={handleCloseModal}>
                      <Modal.Title
                        title={typeModal + title}
                        onClose={handleCloseModal}
                      />
                      {onModalUpdate ? (
                        <div className="flex flex-col gap-2 font-normal my-3">
                          <span className="text-lg font-semibold">
                            {title}:{" "}
                            <span className="font-light text-base">
                              {item.name}
                            </span>
                          </span>

                          <Modal.Input
                            icon={Wrench}
                            type="text"
                            id="expense_service"
                            value={modalData.name}
                            onChange={(e) =>
                              setModalData({
                                name: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                setLoading(true);
                                handleSubmit();
                              }
                            }}
                          />

                          <div>
                            {title === "Tipo de Serviço" && (
                              <div>
                                <span className="flex font-semibold">
                                  A qual tipo de veiculo pertence?*
                                </span>
                                <span className="flex mb-2 font-extralight text-sm">
                                  *selecione ao menos 1 (ou cadastre mais em
                                  Tipo de Veiculos)
                                </span>
                              </div>
                            )}

                            {title === "Tipo de Serviço" &&
                              vehicleType?.map((item, index) => (
                                <section className="flex gap-1" key={index}>
                                  <input
                                    type="checkbox"
                                    checked={selectedVehicleTypes.includes(
                                      item.id
                                    )} // Mark checkbox if selected
                                    value={item.id}
                                    onChange={() =>
                                      handleCheckboxChange(item.id)
                                    }
                                  />
                                  <label>{item.type}</label>
                                </section>
                              ))}
                          </div>
                        </div>
                      ) : (
                        <span className="my-5 font-light text-lg">
                          {selectedExpenseService.name}
                        </span>
                      )}

                      <Modal.Actions
                        onSubmitAction={() => {
                          setLoading(true);
                          handleSubmit();
                        }}
                        nameButtonSubmit={typeModal}
                        bgColorSubmit={colorModal}
                        loading={loading}
                        onCancelAction={handleCloseModal}
                      />
                    </Modal.Root>
                  </div>
                )}
              </th>
            </tr>
          ))}
        </TablePageConfig>
      )}
    </div>
  );
}
