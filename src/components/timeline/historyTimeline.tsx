"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import "../scrollbar/scrollbar.css"; // Importa o arquivo CSS personalizado
import {
  Droplet,
  Map,
  Fuel,
  Wrench,
  Banknote,
  CalendarDays,
  Wallet,
  Check,
  CheckCheck,
} from "lucide-react";
import { ExpenseVehicleContext } from "@/providers/expense/expenseVehicle";
import { parseCookies } from "nookies";
import { format, parseISO } from "date-fns";
import { formatKm } from "@/hooks/km";
import formatNumberWithSpaces from "@/utils/formatCurrencyWhiteSpaces";
import { VehicleContext } from "@/providers/vehicle/vehicle";
import StartHistoric from "../../assets/start-historic.png";
import Editions from "./editions";
import { IncomingContext } from "@/providers/incoming";
import SearchInput from "./search";
import { AddressContext } from "@/providers/address";
import { useRouter } from "next/navigation";
import { UserContext } from "@/providers/user";
import { Modal } from "../modals";

const HistoryTimeline = () => {
  const { user } = useContext(UserContext);
  const { ListAll, listAll, value } = useContext(ExpenseVehicleContext);
  const { valueIncoming } = useContext(IncomingContext);
  const { vehicle, setModalCreateVehicle } = useContext(VehicleContext);
  const { GetAddress, address } = useContext(AddressContext);

  const { push } = useRouter();

  const observer = useRef<IntersectionObserver | null>(null);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [modalWarningVehicle, setModalWarningVehicle] = useState(false);
  const [item, setItem] = useState();

  const cookies = parseCookies();
  const savedVehicleId = cookies["vehicle:selectedVehicleId"];

  useEffect(() => {
    if (vehicle?.length !== 0 && vehicle?.length !== undefined) {
      ListAll({
        vehicleId: savedVehicleId,
        page: "1",
        limit: limit.toString(),
        query,
      });
    }
  }, [savedVehicleId, value, valueIncoming, query]);

  useEffect(() => {
    GetAddress();
  }, []);

  const loadMoreItems = useCallback(async () => {
    const cookies = parseCookies();
    const savedVehicleId = cookies["vehicle:selectedVehicleId"];

    setLoading(true);
    try {
      if (vehicle?.length !== 0) {
        await ListAll({
          vehicleId: savedVehicleId,
          page: "1",
          limit: limit.toString(),
          query,
        });

        setLimit(limit + 10);
      }
    } catch (error) {
      console.error("Erro ao carregar mais itens:", error);
    } finally {
      setLoading(false);
    }
  }, [limit, savedVehicleId, value, valueIncoming, query]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    const callback = (entries: IntersectionObserverEntry[]) => {
      if (
        entries[0].isIntersecting &&
        !loading &&
        !(listAll?.list.length && listAll.list.length === listAll.total)
      ) {
        loadMoreItems();
      }
    };
    observer.current = new IntersectionObserver(callback);
    if (observer.current && listAll?.list.length) {
      const lastItem = document.querySelector(".last-item");
      if (lastItem) observer.current.observe(lastItem);
    }
    return () => observer.current?.disconnect();
  }, [
    listAll,
    loadMoreItems,
    loading,
    limit,
    savedVehicleId,
    value,
    valueIncoming,
    query,
  ]);

  const getExpenseIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "manutenção":
        return <Wrench size={18} color="white" />;
      case "abastecimento":
        return <Fuel size={18} color="white" />;
      case "incoming":
        return <Wallet size={18} color="white" />;
      default:
        return <Wallet size={18} color="white" />;
    }
  };

  const getExpenseBgColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "manutenção":
        return "bg-amber-300";
      case "abastecimento":
        return "bg-orange-300";
      case "incoming":
        return "bg-green-300";
      default:
        return "bg-red-300";
    }
  };

  const handleModalOn = (item: any) => {
    setModalOn(true);
    setItem(item);
  };

  const handleModalClose = () => {
    setModalOn(false);
    setItem(undefined);
  };

  const handleModalWarningVehicleOn = () => setModalWarningVehicle(true);
  const handleModalWarningVehicleClose = () => setModalWarningVehicle(false);

  const findVehicleChoice = vehicle?.find((item) => savedVehicleId === item.id);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  const minHeight =
    listAll && listAll.list && listAll.list.length > 0 ? "73vh" : "84.9vh";

  return (
    <div className="ms-2 mt-5 mb-4 max-h-screen rounded-xl shadow-lg pt-5 bg-white">
      {listAll &&
        listAll !== null &&
        listAll.list.length !== null &&
        listAll.list.length !== 0 && (
          <div className="flex flex-col gap-2">
            <section className="flex flex-col ml-5">
              <h2 className="font-semibold mb-1">HISTÓRICO</h2>
              <span className=" text-base font-extralight ">
                Hodometro atual:{" "}
                <span className="font-normal">
                  {formatKm(Number(findVehicleChoice?.km))}
                </span>
              </span>
            </section>

            <SearchInput onSearch={handleSearch} />
          </div>
        )}

      {/* <div className="h-px bg-zinc-300 ml-10 mr-10" /> */}
      <div
        className=" px-10 py-3 rounded-xl mt-2 overflow-auto custom-scrollbar "
        style={{ minHeight: minHeight, maxHeight: "84.9vh" }}
      >
        <ol
          className={`relative ${
            (listAll === null || listAll?.list.length === 0) && "border-none"
          } border-s border-zinc-300 text-sm `}
        >
          {modalOn && <Editions item={item} onClose={handleModalClose} />}

          {listAll &&
          listAll.list.length !== null &&
          listAll.list.length !== 0 ? (
            listAll.list.map((item, index) => (
              <li
                key={index}
                className={`mb-7 ms-8 ${
                  index === listAll.list.length - 1 ? "last-item" : ""
                } cursor-pointer`}
                onClick={() => handleModalOn(item)}
              >
                {
                  <span
                    className={`absolute flex items-center justify-center w-8 h-8 ${getExpenseBgColor(
                      item.type === "incoming"
                        ? item.type
                        : item.expense_type.name
                    )} rounded-full -start-3 ring-8 ring-white`}
                  >
                    {getExpenseIcon(
                      item.type === "incoming"
                        ? item.type
                        : item.expense_type.name
                    )}
                  </span>
                }

                {item.type === "expense" ? (
                  <div className="flex flex-wrap items-center mb-1 text-lg font-semibold text-gray-900">
                    <h3 className="flex  flex-wrap">{item.description}</h3>
                  </div>
                ) : (
                  <div className="flex flex-wrap  items-center justify-between mb-1 text-lg font-semibold text-gray-900">
                    <h3 className="flex flex-wrap">{item.title}</h3>
                  </div>
                )}

                <span className="flex mt-4 items-center mb-2 text-base font-normal leading-none text-gray-400 ">
                  <CalendarDays size={14} className="mr-1 " />
                  {format(parseISO(item.date), "dd/MM/yyyy - HH:mm")}
                </span>

                {item.km && (
                  <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
                    <Map size={16} className="mr-1" />
                    KM: {formatKm(item.km)}
                  </span>
                )}

                {item.fuel_type && (
                  <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
                    <Droplet size={16} className="mr-1" />
                    {item.fuel_type}
                  </span>
                )}

                <span
                  className={`flex mb-2 text-lg items-center font-normal leading-none ${
                    item.type === "incoming" ? "text-green-600" : "text-red-400"
                  }`}
                >
                  <Banknote
                    size={16}
                    className={`mr-1 ${
                      item.type === "incoming"
                        ? "text-green-600"
                        : "text-red-400"
                    }`}
                  />
                  R${" "}
                  {formatNumberWithSpaces(item.amount || item.amount_received)}
                </span>
              </li>
            ))
          ) : (
            <div className="flex items-center flex-col">
              <section className="flex flex-col md:flex md:flex-row gap-2 items-center md:items-end w-full">
                <img
                  src={StartHistoric.src}
                  width={80}
                  alt="imagem cadastros"
                />
                <h2 className="text-center text-3xl font-semibold text-zinc-600">
                  Pronto para começar?
                </h2>
              </section>
              <ol className="flex  flex-col mt-6 w-full gap-2">
                <li
                  className={`rounded-md border border-green-300 px-3 py-4 hover:bg-green-300  hover:text-white font-semibold ${
                    user?.tour !== "starting"
                      ? "bg-green-300 text-white cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <button
                    disabled={user?.tour !== "starting"}
                    className={`flex justify-between w-full ${
                      user?.tour !== "starting" &&
                      "font-semibold cursor-not-allowed"
                    }`}
                  >
                    Fazer Tour Inicial
                    <span>
                      {user?.tour !== "starting" ? <CheckCheck /> : "1 / 4"}
                    </span>
                  </button>
                </li>
                <li
                  onClick={() => {
                    if (vehicle?.length === 0) {
                      push("/dashboard/meus-veiculos");
                      setModalCreateVehicle(true);
                    }
                  }}
                  className={`rounded-md border border-green-400 px-3 py-4 hover:bg-green-400  hover:text-white font-semibold ${
                    vehicle !== null && vehicle?.length !== 0
                      ? "bg-green-400 text-white cursor-not-allowed "
                      : "cursor-pointer"
                  }`}
                >
                  <button
                    disabled={vehicle !== null && vehicle?.length !== 0}
                    className={`flex justify-between w-full ${
                      vehicle !== null &&
                      vehicle?.length !== 0 &&
                      "cursor-not-allowed f"
                    }`}
                  >
                    Adicionar Veículo{" "}
                    <span>
                      {vehicle !== null && vehicle?.length !== 0 ? (
                        <CheckCheck />
                      ) : (
                        "2 / 4"
                      )}
                    </span>
                  </button>
                </li>
                <li
                  onClick={() => address === null && push("/dashboard/perfil")}
                  className={`rounded-md border border-green-500 px-3 py-4 hover:bg-green-500 cursor-pointer hover:text-white font-semibold ${
                    address !== null
                      ? "bg-green-500 text-white cursor-not-allowed "
                      : "cursor-pointer"
                  }`}
                >
                  <button
                    disabled={address !== null}
                    className="flex justify-between w-full "
                  >
                    Adicionar Meu endereço{" "}
                    <span>{address !== null ? <CheckCheck /> : "3 / 4"}</span>
                  </button>
                </li>
                <li
                  onClick={() => {
                    if (vehicle?.length !== 0) {
                      listAll?.list.length === 0 &&
                        push("/dashboard/abastecimento/criar");
                    } else {
                      handleModalWarningVehicleOn();
                    }
                  }}
                  className={`rounded-md border border-green-400 px-3 py-4 hover:bg-green-600 cursor-pointer hover:text-white font-semibold`}
                >
                  <button
                    disabled={listAll !== null && listAll?.list.length !== 0}
                    className="flex justify-between w-full cursor-pointer"
                  >
                    Adicionar Primeiro Abastecimento
                    <span>
                      {listAll !== null && listAll?.list.length !== 0 ? (
                        <CheckCheck />
                      ) : (
                        "4 / 4"
                      )}
                    </span>
                  </button>
                </li>
              </ol>
            </div>
          )}

          {loading && <p>Loading...</p>}
          {!loading &&
          listAll?.list.length &&
          listAll.list.length === listAll?.total ? (
            <p className="text-center font-semibold text-zinc-600 -mt-3 py-2">
              Sem mais para carregar
            </p>
          ) : (
            <></>
          )}
        </ol>
      </div>

      {modalWarningVehicle && (
        <Modal.Root>
          <Modal.Title title="Nenhum Veículo Adicionado" />
          <Modal.Span span="Para começar a utilizar todos os recursos do sistema, você precisa adicionar um veículo. Sem um veículo registrado, não será possível acompanhar seus abastecimentos, manutenções ou outros dados importantes relacionados ao seu veículo. Adicione um veículo agora para garantir que você tenha todas as informações organizadas e acessíveis." />
          <Modal.Actions
            onSubmitAction={() => {
              push("/dashboard/meus-veiculos");
              setModalCreateVehicle(true);
            }}
            nameButtonSubmit="Adicionar Veículo"
            onCancelAction={handleModalWarningVehicleClose}
          />
        </Modal.Root>
      )}
    </div>
  );
};

export default HistoryTimeline;
