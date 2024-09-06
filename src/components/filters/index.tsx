"use client";

import { ChevronDown, Filter, Search } from "lucide-react";
import SearchInput from "../timeline/search";
import { useFilters } from "@/providers/components/filter";

export default function Filters() {
  const {
    setQuery,
    searchButton,
    setSearchButton,
    datesFilter,
    setDatesFilter,
    start_date,
    setStartDate,
    end_date,
    setEndDate,
    setSubmitDates,
  } = useFilters();

  const handleCloseSearch = () => {
    setSearchButton((prev) => !prev);
    setQuery("");
  };

  return (
    <div>
      <div>
        <section className="flex my-4 ms-4 gap-2">
          <span
            onClick={() => setSearchButton((prev) => !prev)}
            className={` relative flex gap-2 px-4 py-1 font-light border border-zinc-200 rounded-full items-center justify-center ${
              searchButton ? "bg-zinc-600 text-white" : "bg-white"
            }`}
          >
            <Search size={14} strokeWidth={1.5} />
          </span>

          <button
            onClick={() => setDatesFilter((prev) => !prev)}
            className={` relative flex gap-2 px-4 font-light border border-zinc-200 rounded-full items-center justify-center ${
              datesFilter || (start_date && end_date)
                ? "bg-zinc-600 text-white"
                : "bg-white"
            } ${start_date && end_date && "text-base"}`}
          >
            {start_date && end_date ? (
              <>
                {start_date} - {end_date}{" "}
                <ChevronDown size={14} strokeWidth={1.5} />
              </>
            ) : (
              <>
                <span className="text-base">Periodo</span>
                <Filter size={14} strokeWidth={1.5} />
              </>
            )}
          </button>
        </section>

        <section>
          {searchButton && (
            <section className="flex items-center">
              <SearchInput onSearch={setQuery} maxWidth="" />
              <span
                className="font-bold cursor-pointer pe-6"
                onClick={handleCloseSearch}
              >
                X
              </span>
            </section>
          )}
        </section>
      </div>

      {datesFilter && (
        <div
          onClick={() => setDatesFilter(false)} // Fecha o filtro ao clicar fora
          className={`z-50 fixed top-0 left-0 w-full h-full flex bg-black bg-opacity-40 `}
        >
          <div
            onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar dentro
            className="fixed bottom-0 slg:right-0 bg-white w-full slg:w-80 lgg:w-96 xl:min-w-[420px] slg:min-h-screen rounded-t-3xl slg:rounded-none slg:rounded-l-xl flex-col gap-3 py-5 px-6 z-50"
          >
            <section className="flex items-center justify-between pr-2 mt-2 mb-4">
              <h2 className="flex flex-row items-center gap-2 font-bold text-lg ">
                <Filter size={16} strokeWidth={2.5} /> Datas
              </h2>
              <span
                onClick={() => {
                  // Lógica para cancelar

                  setDatesFilter(false); // Fechar o filtro de datas
                }}
                className="flex mt-0.5 items-center text-base font-semibold underline underline-offset-4 text-green-500 cursor-pointer"
              >
                Fechar
              </span>
            </section>
            <h3 className="font-bold text-base">Últimos períodos</h3>
            <section className="flex flex-row gap-1 my-4">
              {[
                { label: "7 dias", days: 7 },
                { label: "15 dias", days: 15 },
                { label: "30 dias", days: 30 },
                { label: "90 dias", days: 90 },
              ].map((period) => (
                <span
                  key={period.days}
                  className="text-base border border-zinc-200 px-2 py-1 rounded-xl cursor-pointer"
                  onClick={() => {
                    const today = new Date();
                    const start = new Date(today);
                    start.setDate(today.getDate() - period.days);

                    const formatDate = (date: Date) => {
                      const day = String(date.getDate()).padStart(2, "0");
                      const month = String(date.getMonth() + 1).padStart(
                        2,
                        "0"
                      );
                      const year = date.getFullYear();
                      return `${day}/${month}/${year}`;
                    };

                    setStartDate(formatDate(start));
                    setEndDate(formatDate(today));
                  }}
                >
                  {period.label}
                </span>
              ))}
            </section>

            <h3 className="font-bold text-base">Período específico</h3>

            <div className="flex flex-row gap-2">
              <section className="flex flex-col gap-1 mt-4">
                <label className="font-light text-base">Data Inicio:</label>
                <input
                  type="date"
                  className="px-2 py-3 rounded-md border border-gray-200"
                  value={start_date.split("/").reverse().join("-")} // Formata a data para o formato do input
                  onChange={(e) => {
                    const [year, month, day] = e.target.value.split("-");
                    const formattedDate = `${day.padStart(
                      2,
                      "0"
                    )}/${month.padStart(2, "0")}/${year}`;
                    setStartDate(formattedDate);
                  }}
                />
              </section>

              <section className="flex flex-col gap-1 mt-4">
                <label className="font-light text-base">Data Final:</label>
                <input
                  type="date"
                  className="px-1 py-3 rounded-md border border-gray-200"
                  value={end_date.split("/").reverse().join("-")} // Formata a data para o formato do input
                  onChange={(e) => {
                    const [year, month, day] = e.target.value.split("-");
                    const formattedDate = `${day.padStart(
                      2,
                      "0"
                    )}/${month.padStart(2, "0")}/${year}`;
                    setEndDate(formattedDate);
                  }}
                />
              </section>
            </div>

            <span className="flex font-extralight font-base mt-2 text-sm">
              *Consulte com limite máximo de 2 anos entre a data inicial e a
              data final
            </span>

            <section className="flex flex-col w-full mt-4 gap-2 items-center ">
              <button
                disabled={!start_date || !end_date}
                onClick={() => {
                  // Lógica para aplicar os valores selecionados
                  setSubmitDates((prev) => !prev);
                  setDatesFilter((prev) => !prev);
                  // Adicione aqui a lógica para filtrar ou processar os dados com base nas datas
                }}
                className={`${
                  !start_date || !end_date
                    ? "bg-zinc-300 text-zinc-400"
                    : "bg-green-500"
                }  font-bold text-white py-2 px-4 rounded w-full justify-center`}
              >
                Aplicar Filtro
              </button>

              <button
                disabled={!start_date || !end_date}
                onClick={() => {
                  // Lógica para cancelar
                  setStartDate("");
                  setEndDate("");
                  setSubmitDates((prev) => !prev);
                  setDatesFilter(false); // Fechar o filtro de datas
                }}
                className={`${
                  start_date || end_date
                    ? "border border-green-300 text-green-500"
                    : "border border-zinc-300 text-zinc-400"
                }  font-bold  py-2 px-4 rounded w-full justify-center`}
              >
                Limpar Filtro
              </button>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
