"use client";

import { CalendarFold, Car, Map, Plus, Text } from "lucide-react";
import HeaderComposition from "../header/headerComposition";
import { ReactNode, useContext, useEffect, useState } from "react";
import { NotDataTable } from "../tablesNotData";

import AddCar from "../../assets/add-car.png";
import { VehicleContext } from "@/providers/vehicle/vehicle";
import TableSkeleton from "../tablesNotData/skeleton";
import { Modal } from "../modals";
import { VehicleTypeContext } from "@/providers/vehicle/vehicleType";
import formatPlate from "@/utils/formatPlate";

interface Props {
  children: ReactNode[];
}

export default function VehicleLayout({ children }: Props) {
  const { CreateVehicle, vehicle, modalCreateVehicle, setModalCreateVehicle } =
    useContext(VehicleContext);
  const { GetVehicleType, vehicleType, value } = useContext(VehicleTypeContext);
  const [onModal, setOnModal] = useState(false);
  console.log("onModal ", onModal);
  const [loading, setLoading] = useState(false);
  const limitVehicles = 2;

  const [modalData, setModalData] = useState({
    vehicle_type_id: "",
    title: "",
    brand: "",
    model: "",
    plate: "",
    year: Number(""),
    km: Number(""),
  });

  const [checkErrors, setCheckErrors] = useState(false); // Estado para controlar a verificação de erros

  const checkFormErrors = () => {
    // Verifica se há erros nos dados do formulário
    return (
      !modalData.title ||
      !modalData.brand ||
      !modalData.model ||
      !modalData.plate ||
      !modalData.year
    );
  };

  useEffect(() => {
    if (vehicleType === null) {
      GetVehicleType();
    }
  }, [value, onModal, modalCreateVehicle]);

  const handleSubmit = () => {
    setLoading(true);
    setCheckErrors(true); // Habilita a verificação de erros ao enviar o formulário

    // Verifica se há erros nos dados do formulário
    if (!checkFormErrors()) {
      CreateVehicle(modalData).finally(() => {
        setLoading(false);
        handleCloseModal();

        setModalData({
          vehicle_type_id: "",
          title: "",
          brand: "",
          model: "",
          plate: "",
          year: Number(""),
          km: Number(""),
        });
        setCheckErrors(false); // Desabilita a verificação de erros após o envio
      });
    } else {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOnModal(false);
    setModalCreateVehicle(false);
  };
  const handleOpenModal = () => {
    setOnModal(true);
    setModalCreateVehicle(true);
  };

  if (!children) {
    return <TableSkeleton />;
  }

  // Função para formatar o número com pontos como separadores de milhares
  const formatNumber = (value: string) => {
    // Remove qualquer coisa que não seja número
    value = value.replace(/\D/g, "");
    // Adiciona pontos como separadores de milhares
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return value;
  };

  return (
    <div
      className={`w-full rounded-xl gap-4 px-6 py-5 mt-3 mb-5 shadow-lg bg-white`}
    >
      <HeaderComposition
        nameButton="Novo Veículo"
        typeSubmit="button"
        title={`Veículos (${vehicle?.length}/${limitVehicles})`}
        icon={Car}
        handleSubmit={handleOpenModal}
      />

      {children.length === 0 ? (
        <div className="flex flex-col items-center justify-center pb-5">
          <NotDataTable.Root>
            <NotDataTable.Body
              img={AddCar}
              actionButton={handleOpenModal}
              icon={Plus}
              title="Veículo"
            />
          </NotDataTable.Root>
        </div>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr className="hidden slg:table-row text-left">
              <th className="py-3">#</th>
              <th className="py-3">Tipo</th>
              <th className="py-3">Apelido</th>
              <th className="py-3">Marca</th>
              <th className="py-3 px-3">Modelo</th>
              <th className="py-3 px-3">Ano</th>

              <th className="text-right py-3 pr-8">{/* Ação */}</th>
            </tr>
          </thead>

          <tbody className="font-light text-base">{children}</tbody>
        </table>
      )}

      {(onModal || modalCreateVehicle) && (
        <div className="fixed inset-0 z-50 top-0 left-0 h-full w-full flex flex-col items-center justify-center bg-zinc-900 bg-opacity-50 ">
          <Modal.Root onClose={handleCloseModal}>
            <Modal.Title
              title="Cadastrar Novo Veiculo"
              onClose={handleCloseModal}
            />
            <div className="flex flex-col gap-3">
              <section className="flex flex-col gap-1">
                <label
                  htmlFor="select-option"
                  className="font-semibold text-sm uppercase ms-1"
                >
                  Tipo: *
                </label>
                <select
                  id="select-option"
                  className="cursor-pointer border items-center px-2 py-2 rounded-lg outline-none"
                  value={modalData.vehicle_type_id} // Use value ao invés de defaultValue
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      vehicle_type_id: e.target.value,
                    })
                  }
                >
                  <option value="title" title="Tipo de Veículo">
                    Tipo de veículo:
                  </option>
                  {vehicleType?.map((item, index) => (
                    <option
                      key={index}
                      value={item.id}
                      id={item.id}
                      title={item.type}
                    >
                      {item.type}
                    </option>
                  ))}
                </select>
                {(checkErrors && !modalData.vehicle_type_id) ||
                modalData.vehicle_type_id === "title" ? (
                  <span className="text-red-500 text-sm ms-2">
                    Esse é um titulo
                  </span>
                ) : undefined}
              </section>

              <section className="flex flex-col gap-1">
                <span className="font-semibold text-sm uppercase ms-1">
                  Apelido: *
                </span>
                <Modal.Input
                  icon={Text}
                  id="title"
                  placeholder="Carro Principal"
                  value={modalData.title}
                  onChange={(e) =>
                    setModalData({ ...modalData, title: e.target.value })
                  }
                  errorMessage={
                    checkErrors && !modalData.title
                      ? "Obrigatório preencher: Apelido"
                      : undefined
                  } // Verifica se há erro somente após o envio do formulário
                />
              </section>

              <section className="flex flex-col gap-1">
                <span className="font-semibold text-sm uppercase ms-1">
                  Placa: *
                </span>
                <Modal.Input
                  icon={Text}
                  id="plate"
                  placeholder="Placa do Veículo"
                  value={modalData.plate}
                  onChange={(e) => {
                    const formattedPlate = formatPlate(e.target.value);
                    setModalData({
                      ...modalData,
                      plate: formattedPlate,
                    });
                  }}
                  errorMessage={
                    checkErrors && !modalData.plate
                      ? "Obrigatório preencher: Placa"
                      : undefined
                  }
                />
              </section>

              <section className="flex flex-col gap-1">
                <span className="font-semibold text-sm uppercase ms-1">
                  Marca: *
                </span>
                <Modal.Input
                  // icon={AlarmClock}
                  id="brand"
                  placeholder="Hyundai"
                  value={modalData.brand}
                  onChange={(e) =>
                    setModalData({ ...modalData, brand: e.target.value })
                  }
                  errorMessage={
                    checkErrors && !modalData.brand
                      ? "Obrigatório preencher: Marca"
                      : undefined
                  } // Verifica se há erro somente após o envio do formulário
                />
              </section>

              <section className="flex flex-col gap-1">
                <span className="font-semibold text-sm uppercase ms-1">
                  Modelo: *
                </span>
                <Modal.Input
                  // icon={AlarmClock}
                  id="model"
                  placeholder="HB20 automatico"
                  value={modalData.model}
                  onChange={(e) =>
                    setModalData({ ...modalData, model: e.target.value })
                  }
                  errorMessage={
                    checkErrors && !modalData.model
                      ? "Obrigatório preencher: Modelo"
                      : undefined
                  } // Verifica se há erro somente após o envio do formulário
                />
              </section>

              <div className="flex gap-1">
                <section className="flex flex-col gap-1">
                  <span className="font-semibold text-sm uppercase ms-1">
                    Ano: *
                  </span>
                  <Modal.Input
                    icon={CalendarFold}
                    type="number"
                    id="year"
                    placeholder="2015"
                    required
                    value={modalData.year !== 0 ? modalData.year : ""}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        year: Number(e.target.value),
                      })
                    }
                    errorMessage={
                      checkErrors && !modalData.year
                        ? "Obrigatório preencher: Ano"
                        : undefined
                    }
                  />
                </section>

                <section className="flex flex-col gap-1">
                  <span className="font-semibold text-sm uppercase ms-1">
                    Quilometragem:
                  </span>
                  <Modal.Input
                    icon={Map}
                    type="text"
                    id="km"
                    placeholder="75.500"
                    required
                    value={
                      modalData.km === 0
                        ? ""
                        : formatNumber(modalData.km.toString())
                    } // Formatando o valor atual da quilometragem
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        km: Number(e.target.value.replace(/\D/g, "")), // Armazenando apenas números no estado
                      })
                    }
                  />
                </section>
              </div>
            </div>

            <Modal.Actions
              onSubmitAction={() => {
                setLoading(true);
                handleSubmit();
              }}
              loading={loading}
              onCancelAction={handleCloseModal}
            />
          </Modal.Root>
        </div>
      )}
    </div>
  );
}
