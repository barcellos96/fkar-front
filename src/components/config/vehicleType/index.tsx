"use client";

import { Car, Pencil, Trash } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import TableSkeleton from "../tableConfig/skeleton";
import TableConfig from "../tableConfig/table";
import { VehicleContext } from "@/providers/vehicle";
import { Modal } from "@/components/modals";

interface Props {
  title: string;
}

interface VehicleTypeProps {
  id: string;
  type: string;
}

export default function TableVehicleType({ title }: Props) {
  const {
    GetVehicleType,
    vehicleType,
    value,
    DeleteVehicleType,
    UpdateVehicleType,
  } = useContext(VehicleContext);
  const [onModal, setOnModal] = useState(false);
  const [onModalUpdate, setOnModalUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedVehicleType, setSelectedVehicleType] =
    useState<VehicleTypeProps | null>(null);

  const [modalData, setModalData] = useState({
    name: "",
  });

  const handleCloseModal = () => {
    setOnModal(false);
    setOnModalUpdate(false);
  };

  const handleOpenModal = (item: VehicleTypeProps) => {
    setModalData({ name: item.type });
    setSelectedVehicleType(item);
    setOnModal(true);
  };

  useEffect(() => {
    if (vehicleType === null) {
      const fetchData = async () => {
        GetVehicleType();
      };

      fetchData();
    }
  }, [value]);

  const typeModal = onModalUpdate ? "Atualizar " : "Deletar ";
  const colorModal = onModalUpdate ? "bg-yellow-600" : "bg-red-700";

  const handleSubmit = () => {
    if (selectedVehicleType) {
      onModalUpdate
        ? UpdateVehicleType(selectedVehicleType.id, modalData.name).finally(
            () => {
              setLoading(false);
              handleCloseModal();
            }
          )
        : DeleteVehicleType(selectedVehicleType.id).finally(() => {
            setLoading(false);
            handleCloseModal();
          });
    }
  };

  return (
    <div>
      {!vehicleType ? (
        <TableSkeleton />
      ) : (
        <TableConfig title={title}>
          {vehicleType?.map((item, index) => (
            <tr className="border-b" key={index}>
              <th className="font-normal py-5">{index + 1}</th>
              <th className="font-normal">{item.type}</th>
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
                {onModal && selectedVehicleType === item && (
                  <div className="fixed z-50 top-0 left-0 h-full w-full flex flex-col items-center justify-center bg-zinc-900 bg-opacity-10 ">
                    <Modal.Root>
                      <Modal.Title
                        title={typeModal + title}
                        onClose={handleCloseModal}
                      />
                      {onModalUpdate ? (
                        <div className="flex flex-col gap-2 font-normal my-3">
                          <span className="text-lg font-semibold">
                            {title}:
                          </span>
                          <Modal.Input
                            icon={Car}
                            type="text"
                            id="vehicle_types"
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
                        </div>
                      ) : (
                        <span className="my-5 font-light text-lg">
                          {selectedVehicleType.type}
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
        </TableConfig>
      )}
    </div>
  );
}
