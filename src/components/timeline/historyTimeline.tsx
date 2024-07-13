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

const HistoryTimeline = () => {
  const { ListAll, listAll, value } = useContext(ExpenseVehicleContext);
  const { valueIncoming } = useContext(IncomingContext);
  const { vehicle } = useContext(VehicleContext);

  const observer = useRef<IntersectionObserver | null>(null);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [item, setItem] = useState();

  const cookies = parseCookies();
  const savedVehicleId = cookies["vehicle:selectedVehicleId"];

  useEffect(() => {
    if (vehicle?.length !== 0 && vehicle?.length !== undefined) {
      ListAll({
        vehicleId: savedVehicleId,
        page: "1",
        limit: limit.toString(),
      });
    }
  }, [savedVehicleId, value, valueIncoming]);

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
        });

        setLimit(limit + 10);
      }
    } catch (error) {
      console.error("Erro ao carregar mais itens:", error);
    } finally {
      setLoading(false);
    }
  }, [limit, savedVehicleId, value, valueIncoming]);

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

  const findVehicleChoice = vehicle?.find((item) => savedVehicleId === item.id);

  return (
    <div className="ms-2 mt-5 mb-4 max-h-screen  rounded-xl shadow-lg pt-5 bg-white">
      <section className="flex flex-col ml-10">
        <h2 className="font-semibold">HISTÓRICO</h2>
        <span className=" text-base font-extralight mb-4">
          Hodometro atual:{" "}
          <span className="font-normal">
            {formatKm(Number(findVehicleChoice?.km))}
          </span>
        </span>
      </section>
      <div className="h-px bg-zinc-300 ml-10 mr-10" />
      <div
        className=" px-10 py-3 rounded-xl mt-2 overflow-auto custom-scrollbar "
        style={{ maxHeight: "85vh" }}
      >
        <ol className={`relative border-s border-zinc-300 text-sm `}>
          {modalOn && <Editions item={item} onClose={handleModalClose} />}

          {listAll && listAll.list.length > 0
            ? listAll.list.map((item, index) => (
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
                      item.type === "incoming"
                        ? "text-green-600"
                        : "text-red-400"
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
                    {formatNumberWithSpaces(
                      item.amount || item.amount_received
                    )}
                  </span>
                </li>
              ))
            : listAll &&
              listAll.list.length === 0 && (
                <div className="flex items-center flex-col">
                  <img src={StartHistoric.src} alt="start" />
                  <h2 className="text-center text-2xl font-semibold text-zinc-600">
                    Pronto para começar?
                  </h2>
                  <span
                    className={`flex my-6 text-lg text-center items-center justify-center`}
                  >
                    Clique em ADICIONAR no menu e cadastre o seu primeiro
                    abastecimento, despesa, manutenção ou receita.
                  </span>
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
    </div>
  );
};

export default HistoryTimeline;
