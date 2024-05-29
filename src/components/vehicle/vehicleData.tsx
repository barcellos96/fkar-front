"use client";

import { useContext, useEffect, useState } from "react";
import VehicleLayout from ".";
import { VehicleContext } from "@/providers/vehicle/vehicle";
import {
  BikeIcon,
  BusIcon,
  CalendarFold,
  CarIcon,
  Eye,
  Map,
  Pencil,
  PlaneIcon,
  SailboatIcon,
  Text,
  TractorIcon,
  Trash,
  TruckIcon,
} from "lucide-react";
import { Modal } from "../modals";
import { VehicleTypeContext } from "@/providers/vehicle/vehicleType";
import { formatKm } from "@/hooks/km";

interface VehicleProps {
  id: string;
  vehicle_type: { id: string; type: string };
  title?: string;
  brand?: string;
  model?: string;
  plate?: string | null;
  km?: number | null;
  year?: number;
  vehicleId?: string;
}

export default function VehicleData() {
  const { GetVehicle, vehicle, value, UpdateVehicle, DeleteVehicle } =
    useContext(VehicleContext);
  const { GetVehicleType, vehicleType } = useContext(VehicleTypeContext);

  const [onModal, setOnModal] = useState(false);
  const [onModalUpdate, setOnModalUpdate] = useState(false);
  const [onModalDelete, setOnModalDelete] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleProps | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [checkErrors, setCheckErrors] = useState(false); // Estado para controlar a verificação de erros

  const [modalData, setModalData] = useState({
    vehicle_type_id: "",
    title: "",
    brand: "",
    model: "",
    year: Number(""),
    km: Number(""),
    plate: "",
    vehicleId: "",
  });

  const handleOpenModal = (item: VehicleProps) => {
    setSelectedVehicle(item);

    setModalData({
      brand: item.brand ? item.brand : "",
      km: item?.km ? Number(item.km) : Number(""),
      model: item.model ? item.model : "",
      plate: item.plate ? item.plate : "",
      title: item.title ? item.title : "",
      year: item?.year ? Number(item.year) : Number(""),
      vehicle_type_id: item.vehicle_type.id,
      vehicleId: item.id ? item.id : "",
    });

    setOnModal(true);
  };

  const handleCloseModal = () => {
    setOnModalUpdate(false);
    setOnModalDelete(false);
    setOnModal(false);
  };

  useEffect(() => {
    if (vehicle === null) {
      const fetchData = async () => {
        GetVehicle();
      };

      fetchData();
    }
  }, [value]);

  useEffect(() => {
    if (onModal && vehicleType === null) {
      GetVehicleType();
    }
  }, [value, onModal]);

  // Função para retornar o ícone com base no tipo do veículo
  const getVehicleIcon = (type: string) => {
    const normalizedType = type
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Remove acentos

    switch (normalizedType) {
      case "carro":
        return <CarIcon className="text-zinc-500" />;
      case "bicicleta":
        return <BikeIcon className="text-zinc-500" />;
      case "moto":
        return <BikeIcon className="text-zinc-500" />;
      case "onibus":
        return <BusIcon className="text-zinc-500" />;
      case "caminhao":
        return <TruckIcon className="text-zinc-500" />;
      case "aviao":
        return <PlaneIcon className="text-zinc-500" />;
      case "trator":
        return <TractorIcon className="text-zinc-500" />;
      case "barco":
        return <SailboatIcon className="text-zinc-500" />;
      default:
        return null;
    }
  };

  const checkFormErrors = () => {
    // Verifica se há erros nos dados do formulário
    return (
      !modalData.title ||
      !modalData.brand ||
      !modalData.model ||
      !modalData.year
    );
  };

  const colorSubmit = onModalUpdate ? "bg-yellow-600" : "bg-red-700";
  const typeModal = onModalUpdate ? "Atualizar " : "Deletar ";

  const handleSubmit = () => {
    setLoading(true);
    setCheckErrors(true); // Habilita a verificação de erros ao enviar o formulário

    // Verifica se há erros nos dados do formulário
    if (!checkFormErrors()) {
      if (selectedVehicle) {
        onModalUpdate
          ? UpdateVehicle(modalData).finally(() => {
              setLoading(false);
              handleCloseModal();
            })
          : DeleteVehicle(selectedVehicle.id).finally(() => {
              setLoading(false);
              handleCloseModal();
            });
      }
      setModalData({
        vehicle_type_id: "",
        title: "",
        brand: "",
        model: "",
        year: Number(""),
        km: Number(""),
        plate: "",
        vehicleId: "",
      });
      setCheckErrors(false); // Desabilita a verificação de erros após o envio
    } else {
      setLoading(false);
    }
  };

  // Função para formatar o número com pontos como separadores de milhares
  const formatNumber = (value: string) => {
    // Remove qualquer coisa que não seja número
    value = value.replace(/\D/g, "");
    // Adiciona pontos como separadores de milhares
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return value;
  };

  return (
    <>
      {!vehicle ? (
        <div></div>
      ) : (
        <VehicleLayout>
          {vehicle?.map((item, index) => (
            <tr
              key={index}
              className="flex flex-col slg:table-row items-center border-b px-2 py-4 "
            >
              <td className="hidden slg:table-cell slg:py-5">{index + 1}</td>
              <td className="hidden slg:table-cell">
                <section className="flex items-center gap-2">
                  {getVehicleIcon(
                    item.vehicle_type.type
                      .toLowerCase()
                      .replace(/\b\w/g, (char) => char.toLocaleLowerCase())
                  )}
                  {item.vehicle_type.type}{" "}
                </section>
              </td>

              <td className="w-full slg:w-auto flex justify-between items-center slg:table-cell font-semibold text-lg slg:text-base slg:font-light slg:max-w-32">
                <span className="flex slg:table-cell gap-2">
                  <span className="slg:hidden">
                    {getVehicleIcon(
                      item.vehicle_type.type
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toLocaleLowerCase())
                    )}{" "}
                  </span>
                  {item.title
                    .toLowerCase()
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </span>

                <section className="flex gap-2 slg:hidden">
                  <button
                    title="Ver Dados do Veículo"
                    className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                    onClick={() => handleOpenModal(item)}
                  >
                    <Eye width={15} color="white" />
                  </button>
                  <button
                    onClick={() => {
                      setOnModalUpdate(true);
                      handleOpenModal(item);
                    }}
                    className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                  >
                    <Pencil width={15} color="white" />
                  </button>
                  <button
                    onClick={() => {
                      setOnModalDelete(true);
                      handleOpenModal(item);
                    }}
                    className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                  >
                    <Trash width={15} color="white" />
                  </button>
                </section>
              </td>

              <td className="flex gap-2 justify-start text-start slg:hidden w-full slg:w-auto item-start">
                <span>{item.brand}</span> -<span>{item.model}</span>
              </td>
              <td className="hidden slg:table-cell w-full slg:w-auto item-start">
                {item.brand}
              </td>
              <td className="hidden slg:table-cell w-full slg:w-auto item-start slg:px-2">
                {item.model}
              </td>
              <td className="flex gap-2 justify-start text-start slg:table-cell w-full slg:w-auto item-start slg:px-2">
                <span>{item.year}</span>
                <span className="slg:hidden">
                  - {formatKm(Number(item.km))}
                </span>
              </td>
              <td className="hidden slg:flex gap-2 justify-end py-4">
                <button
                  title="Ver Dados do Veículo"
                  className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                  onClick={() => handleOpenModal(item)}
                >
                  <Eye width={15} color="white" />
                </button>
                <button
                  title="Editar Veículo"
                  className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                  onClick={() => {
                    setOnModalUpdate(true);
                    handleOpenModal(item);
                  }}
                >
                  <Pencil width={15} color="white" />
                </button>
                <button
                  title="Excluir Veículo"
                  onClick={() => {
                    setOnModalDelete(true);
                    handleOpenModal(item);
                  }}
                  className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                >
                  <Trash width={15} color="white" />
                </button>
              </td>
            </tr>
          ))}
        </VehicleLayout>
      )}
      {onModal && selectedVehicle && (
        <Modal.Root onClose={handleCloseModal}>
          <Modal.Title
            onClose={handleCloseModal}
            title={selectedVehicle.title ? selectedVehicle.title : ""}
            key={selectedVehicle.id}
          />

          {!onModalUpdate && (
            <div className="uppercase text-base font-light border border-zinc-200 rounded-lg px-2 py-4 flex flex-col gap-3 bg-zinc-100">
              <span className="flex items-center gap-2 font-semibold">
                <span>tipo:</span>
                {getVehicleIcon(
                  selectedVehicle.vehicle_type.type
                    .toLowerCase()
                    .replace(/\b\w/g, (char) => char.toLocaleLowerCase())
                )}
                <span className=" font-light ">
                  {selectedVehicle.vehicle_type.type}
                </span>
              </span>

              {selectedVehicle.model && selectedVehicle.brand ? (
                <section className="flex gap-3">
                  <span className="flex font-semibold items-center gap-1 ">
                    marca:
                    <span className=" font-light">{selectedVehicle.brand}</span>
                  </span>
                  <span className="flex items-center  gap-1 font-semibold">
                    modelo:
                    <span className=" font-light">{selectedVehicle.model}</span>
                  </span>
                </section>
              ) : undefined}

              {selectedVehicle.year && selectedVehicle.km ? (
                <section className="flex gap-3">
                  <span className="flex items-center  gap-1 font-semibold">
                    ano:
                    <span className=" font-light">{selectedVehicle.year}</span>
                  </span>
                  <span className="flex items-center  gap-1 font-semibold">
                    km:
                    <span className=" font-light">
                      {formatKm(selectedVehicle.km)}
                    </span>
                  </span>
                </section>
              ) : undefined}

              {selectedVehicle.plate ? (
                <span className="flex items-center  gap-1 font-semibold">
                  placa:
                  <span className=" font-light">{selectedVehicle.plate}</span>
                </span>
              ) : undefined}
            </div>
          )}
          {onModalUpdate && (
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
                    }
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
          )}

          {!onModalDelete && !onModalUpdate && (
            <button
              onClick={handleCloseModal}
              className="bg-green-700 text-sm text-white rounded-lg font-light flex w-full items-center justify-center py-1 hover:bg-opacity-80"
            >
              Fechar detalhes
            </button>
          )}

          {(onModalDelete || onModalUpdate) && (
            <Modal.Actions
              onSubmitAction={() => {
                // setLoading(true);
                handleSubmit();
              }}
              loading={loading}
              onCancelAction={handleCloseModal}
              bgColorSubmit={colorSubmit}
              nameButtonSubmit={typeModal}
            />
          )}
        </Modal.Root>
      )}
    </>
  );
}
