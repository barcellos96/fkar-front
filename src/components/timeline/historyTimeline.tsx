"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "../scrollbar/scrollbar.css"; // Importa o arquivo CSS personalizado
import { ExpenseVehicleContext } from "@/providers/expense/expenseVehicle";
import { parseCookies } from "nookies";
import { VehicleContext } from "@/providers/vehicle/vehicle";
import Editions from "./editions";
import { IncomingContext } from "@/providers/incoming";
import { AddressContext } from "@/providers/address";
import SkeletonLoader from "./skeletonTimeline";
import { useFilters } from "@/providers/components/filter";
import StartStep from "../stepToStep/start";
import HeaderTimeline from "./headerTimeline";
import Card from "./cardItems";
import { CalendarDays } from "lucide-react";
import formatNumberWithSpaces from "@/utils/formatCurrencyWhiteSpaces";

const HistoryTimeline = () => {
  const { query, start_date, end_date, submitDates } = useFilters();
  const { ListAll, listAll, value } = useContext(ExpenseVehicleContext);
  const { valueIncoming } = useContext(IncomingContext);
  const { vehicle } = useContext(VehicleContext);
  const { GetAddress } = useContext(AddressContext);

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
        query: query,
        start_date: start_date,
        end_date: end_date,
      });
    }
  }, [savedVehicleId, value, valueIncoming, query, submitDates]);

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
          start_date: start_date,
          end_date: end_date,
        });

        setLimit(limit + 10);
      }
    } catch (error) {
      console.error("Erro ao carregar mais itens:", error);
    } finally {
      setLoading(false);
    }
  }, [limit, savedVehicleId, value, valueIncoming, submitDates]);

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
    submitDates,
  ]);

  const handleModalOn = (item: any) => {
    setModalOn(true);
    setItem(item);
  };

  const handleModalClose = () => {
    setModalOn(false);
    setItem(undefined);
  };

  const findVehicleChoice = vehicle?.find((item) => savedVehicleId === item.id);

  const minHeight =
    listAll && listAll.list && listAll.list.length !== 0 ? "69.8vh" : "84.9vh";

  if (!vehicle) {
    return <SkeletonLoader />;
  }

  function formatDate(date: Date) {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${day} de ${month}`;
  }

  let previousDate = "";

  // Função para converter string de valor no formato correto
  const formatValue = (str: string) => {
    return parseFloat(str.replace(/\s/g, "").replace(",", "."));
  };

  // Função para formatar a data no formato "YYYY-MM-DD"
  function formatedDate(dateString: string): string {
    return new Date(dateString).toISOString().split("T")[0]; // Remove horas e mantém só a data
  }

  const summedByDate: any = listAll?.list.reduce(
    (acc: { [key: string]: number }, item) => {
      const formattedDate = formatedDate(item.date); // Supondo que a data já esteja no formato correto

      // Certifique-se de que 'value' é um número
      const value =
        Number(formatValue(item.amount ?? item.amount_received)) || 0;

      // Inicializa a data no acumulador com 0, se ainda não existir
      if (!acc[formattedDate]) {
        acc[formattedDate] = 0;
      }

      // Verifica o tipo e realiza a soma/subtração corretamente
      if (item.type === "incoming") {
        acc[formattedDate] += value;
      } else if (item.type === "expense") {
        acc[formattedDate] -= value;
      }

      return acc;
    },
    {}
  );

  return (
    <div className="ms-2 mt-5 mb-4 max-h-screen rounded-xl shadow-lg pt-5 bg-white">
      {listAll && listAll !== null && listAll.list.length !== 0 ? (
        <HeaderTimeline km={Number(findVehicleChoice?.km)} />
      ) : query.length > 0 ? (
        <HeaderTimeline km={Number(findVehicleChoice?.km)} />
      ) : (
        ""
      )}

      <div
        className=" px-5 py-3 rounded-xl overflow-auto custom-scrollbar "
        style={{ minHeight: minHeight, maxHeight: minHeight }}
      >
        <ol className={`relative  text-sm `}>
          {modalOn && <Editions item={item} onClose={handleModalClose} />}

          {listAll && listAll.list.length !== 0 ? (
            listAll.list.map((item, index) => {
              // Format the current item's date
              const currentDate = formatDate(new Date(item.date));

              // Check if the current date is different from the previous date
              const showDate = currentDate !== previousDate;

              // Update the previous date
              previousDate = currentDate;
              const currentDateComparation = formatedDate(item.date);

              return (
                <div className="flex flex-col" key={index}>
                  {/* Conditionally render the date */}
                  {showDate && (
                    <div className="flex flex-row justify-between no-wrap border-b border-zinc-200 py-1 mb-4">
                      <section className="flex flex-row gap-1 items-center">
                        <CalendarDays size={14} strokeWidth={1} />
                        <span className="mt-0.5">{currentDate}</span>
                      </section>

                      <section>
                        {/* Pegando o saldo do dia correspondente a currentDate em summedByDate */}
                        <p>
                          Saldo do dia{" "}
                          <strong>
                            R${" "}
                            {summedByDate[currentDateComparation] !== undefined
                              ? formatNumberWithSpaces(
                                  summedByDate[currentDateComparation]
                                )
                              : 0}
                          </strong>
                        </p>
                      </section>
                    </div>
                  )}
                  <Card
                    item={item}
                    onClick={handleModalOn}
                    index={index}
                    isLastItem={index === listAll.list.length - 1}
                  />
                </div>
              );
            })
          ) : listAll && query.length !== 0 && listAll.list.length === 0 ? (
            <>
              <p>Nenhum conteúdo encontrado na pesquisa.</p>
            </>
          ) : (
            <StartStep />
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
