"use client";

import React, { useContext, useEffect } from "react";
import { Bell, CalendarDays, CornerDownRight } from "lucide-react";
import { ReminderContext } from "@/providers/reminder";
import { differenceInDays, format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import "../scrollbar/scrollbar.css";

const ReminderTimeline = () => {
  const { GetReminder, reminder } = useContext(ReminderContext);
  const { push } = useRouter();

  useEffect(() => {
    GetReminder();
  }, []);

  // Função para calcular os dias restantes
  const calculateDaysRemaining = (dateString: string) => {
    const currentDate = new Date();
    const targetDate = new Date(dateString);
    return differenceInDays(targetDate, currentDate);
  };

  const filteredRemindersByDate = reminder
    ?.filter((item) => calculateDaysRemaining(item.date_reminder ?? "") >= -2)
    .map((item, index) => {
      return item;
    });

  return (
    <div className=" mt-5 rounded-xl shadow-lg bg-white">
      <div className="gap-2 flex flex-row justify-between items-center px-3 py-2 rounded-t-lg bg-green-200 truncate">
        <span className="flex items-center">
          <Bell size={16} />
          <h2 className="ml-1 text-sm slg:text-lg font-semibold truncate">
            PRÓXIMOS LEMBRETES
          </h2>
        </span>
        <button
          type="button"
          className="text-green-700 text-sm slg:text-lg font-semibold hover:text-green-500"
          onClick={() => push("/dashboard/lembretes")}
        >
          Ver todos
        </button>
      </div>

      <div
        className="ms-3 py-3 rounded-xl overflow-auto custom-scrollbar "
        style={{ maxHeight: "30vh" }}
      >
        <div className="max-w-[40rem] ">
          {filteredRemindersByDate?.length === 0 ? (
            <h1 className="flex text-lg font-bold">Nenhum lembrete próximo</h1>
          ) : (
            filteredRemindersByDate?.map((item, index) => (
              <div
                key={index}
                className="border-s-8 border-green-200 px-5 py-3 rounded-xl shadow-md mb-2 me-2 "
              >
                <div className="flex flex-row items-center justify-between">
                  <h3 className="text-sm slg:text-base font-semibold text-gray-900">
                    {item.title.toUpperCase()}
                  </h3>
                  <section className="flex gap-1">
                    <CornerDownRight height={10} width={10} />
                    <span className="text-sm text-gray-500">
                      {calculateDaysRemaining(item.date_reminder ?? "") < 0 ? (
                        <span className="text-red-500">
                          há&nbsp;
                          {calculateDaysRemaining(item.date_reminder ?? "")}
                          &nbsp;dias
                        </span>
                      ) : (
                        <span className="text-green-700">
                          faltam&nbsp;
                          {calculateDaysRemaining(item.date_reminder ?? "")}
                          &nbsp;dias
                        </span>
                      )}
                    </span>
                  </section>
                </div>
                <div className="flex flex-row items-center  mt-2 text-gray-400 leading-none">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {" "}
                    {format(
                      parseISO(item.date_reminder ?? ""),
                      "dd/MM/yyyy - HH:mm"
                    )}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReminderTimeline;
