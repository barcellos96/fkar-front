import React from "react";
import "../scrollbar/scrollbar.css"; // Importa o arquivo CSS personalizado
import { Bell, CalendarDays } from "lucide-react";
import "../scrollbar/scrollbar.css";

const ReminderTimeline = () => {
  return (
    <div className=" mt-5 rounded-xl shadow-lg bg-white">
      <div className="gap-2 flex flex-row justify-between items-center px-3 py-2 rounded-t-lg bg-green-200 truncate">
        <h2 className="ml-2 font-semibold truncate">PRÓXIMOS LEMBRETES</h2>
        <button
          type="button"
          className="text-green-700 font-bold hover:text-blue-500"
        >
          Ver todos
        </button>
      </div>

      <div
        className="ms-3 py-3 rounded-xl overflow-auto custom-scrollbar "
        style={{ maxHeight: "25vh" }}
      >
        <div className="max-w-[40rem] ">
          {/* Use map ou seu método preferido para renderizar os lembretes */}
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="border-s-8 border-green-200 px-5 py-3 rounded-xl mb-2 "
            >
              <div className="flex flex-row items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Trocar Óleo
                </h3>
                <span className="text-sm text-gray-400 leading-none">
                  Faltam 5 dias
                </span>
              </div>
              <div className="flex flex-row items-center ml-1 mt-1 text-gray-400 leading-none">
                <CalendarDays className="w-4 h-4 mr-1" />
                <span className="text-sm">Abril 27, 2024</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReminderTimeline;
