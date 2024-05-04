import React from "react";

import "../scrollbar/scrollbar.css"; // Importa o arquivo CSS personalizado
import {
  Calendar,
  Droplet,
  Map,
  Wallet,
  Fuel,
  Wrench,
  Banknote,
  Menu,
  EllipsisVertical,
} from "lucide-react";

// tenho uma LI correta para quando for consumir os dados. Está conforme preciso para que nao quebre o histórico

const HistoryTimeline = () => {
  return (
    <div className="ms-2 mt-5 mb-4 h-screen rounded-xl shadow-lg pt-5 bg-white max-w-[375px] sm:max-w-[100%]">
      <h2 className="ml-10 font-semibold">HISTÓRICO</h2>
      <div className="h-px bg-zinc-300 ml-10 mr-10" />
      <div
        className=" px-10 py-3 rounded-xl mt-2 overflow-auto custom-scrollbar "
        style={{ maxHeight: "90vh" }}
      >
        <ol className="relative border-s border-zinc-300 ">
          <li className="mb-7 ms-8">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-orange-300 rounded-full -start-3 ring-8 ring-white ">
              <Fuel size={18} color="white" />
            </span>

            <div className="flex items-center justify-between mb-1 text-lg font-semibold text-gray-900">
              <h3 className="truncate" title="SERVIÇO - Manutenção dos Freios">
                Abastecimento{" "}
              </h3>
              <div className="flex items-center text-center text-base font-normal leading-none text-gray-400">
                <Calendar size={16} className="mr-1 " />
                <span className="gap-3 flex ml-auto items-center text-center text-base font-normal leading-none text-gray-400 ">
                  13 jan 2024
                  <EllipsisVertical className="hover:text-cyan-700 cursor-pointer" />
                </span>
              </div>
            </div>

            <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
              <Map size={16} className="mr-1" />
              KM: 79.000
            </span>
            <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
              <Droplet size={16} className="mr-1" />
              Gasolina Comum
            </span>
            <span className="flex mb-2 text-base font-normal leading-none text-red-400 ">
              <Banknote size={16} className="mr-1" color="red" />
              R$ 170.00
            </span>
          </li>
          <li className="mb-7 ms-8">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-amber-300 rounded-full -start-3 ring-8 ring-white ">
              <Wrench size={18} color="white" />
            </span>
            <div className="flex items-center justify-between mb-1 text-lg font-semibold text-gray-900">
              <h3 className="truncate" title="SERVIÇO - Manutenção dos Freios">
                SERVIÇO - Manutenção dos Freios
              </h3>
              <div className="flex items-center text-center text-base font-normal leading-none text-gray-400">
                <Calendar size={16} className="mr-1 " />
                <span className="gap-3 flex ml-auto items-center text-center text-base font-normal leading-none text-gray-400 ">
                  13 jan 2024
                  <EllipsisVertical className="hover:text-cyan-700 cursor-pointer" />
                </span>
              </div>
            </div>

            <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
              <Map size={16} className="mr-1" />
              KM: 79.000
            </span>
            <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
              <Droplet size={16} className="mr-1" />
              Gasolina Comum
            </span>
            <span className="flex mb-2 text-base font-normal leading-none text-red-400 ">
              <Banknote size={16} className="mr-1" color="red" />
              R$ 170.00
            </span>
          </li>
          <li className="mb-7 ms-8">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-green-300 rounded-full -start-3 ring-8 ring-white ">
              <Wallet size={18} color="white" />
            </span>
            <div className="flex items-center justify-between mb-1 text-lg font-semibold text-gray-900">
              <h3 className="truncate" title="SERVIÇO - Manutenção dos Freios">
                RECEITA - Carona
              </h3>
              <div className="flex items-center text-center text-base font-normal leading-none text-gray-400">
                <Calendar size={16} className="mr-1 " />
                <span className="gap-3 flex ml-auto items-center text-center text-base font-normal leading-none text-gray-400 ">
                  13 jan 2024
                  <EllipsisVertical className="hover:text-cyan-700 cursor-pointer" />
                </span>
              </div>
            </div>

            <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
              <Map size={16} className="mr-1" />
              KM: 79.000
            </span>
            <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
              <Droplet size={16} className="mr-1" />
              Gasolina Comum
            </span>
            <span className="flex mb-2 text-base font-normal leading-none text-green-400 ">
              <Banknote size={16} className="mr-1" color="green" />
              R$ 170.00
            </span>
          </li>
          <li className="mb-7 ms-8">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-red-300 rounded-full -start-3 ring-8 ring-white ">
              <Wallet size={18} color="white" />
            </span>
            <div className="flex items-center justify-between mb-1 text-lg font-semibold text-gray-900">
              <h3 className="truncate" title="SERVIÇO - Manutenção dos Freios">
                DESPESA - IPVA(licenciamento){" "}
              </h3>
              <div className="flex items-center text-center text-base font-normal leading-none text-gray-400">
                <Calendar size={16} className="mr-1 " />
                <span className="gap-3 flex ml-auto items-center text-center text-base font-normal leading-none text-gray-400 ">
                  13 jan 2024
                  <EllipsisVertical className="hover:text-cyan-700 cursor-pointer" />
                </span>
              </div>
            </div>
            <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
              <Map size={16} className="mr-1" />
              KM: 79.000
            </span>
            <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
              <Droplet size={16} className="mr-1" />
              Gasolina Comum
            </span>
            <span className="flex mb-2 text-base font-normal leading-none text-red-400 ">
              <Banknote size={16} className="mr-1" color="red" />
              R$ 170.00
            </span>
          </li>
          <li className="mb-7 ms-8">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-amber-300 rounded-full -start-3 ring-8 ring-white ">
              <Wrench size={18} color="white" />
            </span>

            <div className="flex items-center justify-between mb-1 text-lg font-semibold text-gray-900">
              <h3 className="truncate" title="SERVIÇO - Manutenção dos Freios">
                SERVIÇO - Troca de oleo
              </h3>
              <div className="flex items-center text-center text-base font-normal leading-none text-gray-400">
                <Calendar size={16} className="mr-1 " />
                <span className="gap-3 flex ml-auto items-center text-center text-base font-normal leading-none text-gray-400 ">
                  13 jan 2024
                  <EllipsisVertical className="hover:text-cyan-700 cursor-pointer" />
                </span>
              </div>
            </div>

            <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
              <Map size={16} className="mr-1" />
              KM: 79.000
            </span>
            <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
              <Droplet size={16} className="mr-1" />
              Gasolina Comum
            </span>
            <span className="flex mb-2 text-base font-normal leading-none text-red-400 ">
              <Banknote size={16} className="mr-1" color="red" />
              R$ 170.00
            </span>
          </li>
          <li className="mb-7 ms-8">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-green-300 rounded-full -start-3 ring-8 ring-white ">
              <Wallet size={18} color="white" />
            </span>

            <div className="flex items-center justify-between mb-1 text-lg font-semibold text-gray-900">
              <h3 className="truncate" title="SERVIÇO - Manutenção dos Freios">
                RECEITA - Carona
              </h3>
              <div className="flex items-center text-center text-base font-normal leading-none text-gray-400">
                <Calendar size={16} className="mr-1 " />
                <span className="gap-3 flex ml-auto items-center text-center text-base font-normal leading-none text-gray-400 ">
                  13 jan 2024
                  <EllipsisVertical className="hover:text-cyan-700 cursor-pointer" />
                </span>
              </div>
            </div>

            <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
              <Map size={16} className="mr-1" />
              KM: 79.000
            </span>
            <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
              <Droplet size={16} className="mr-1" />
              Gasolina Comum
            </span>
            <span className="flex mb-2 text-base font-normal leading-none text-green-400 ">
              <Banknote size={16} className="mr-1" color="green" />
              R$ 170.00
            </span>
          </li>
          <li className="mb-7 ms-8">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-amber-300 rounded-full -start-3 ring-8 ring-white ">
              <Wrench size={18} color="white" />
            </span>

            <div className="flex items-center justify-between mb-1 text-lg font-semibold text-gray-900">
              <h3 className="truncate" title="SERVIÇO - Manutenção dos Freios">
                SERVIÇO - Lataria
              </h3>
              <div className="flex items-center text-center text-base font-normal leading-none text-gray-400">
                <Calendar size={16} className="mr-1 " />
                <span className="gap-3 flex ml-auto items-center text-center text-base font-normal leading-none text-gray-400 ">
                  13 jan 2024
                  <EllipsisVertical className="hover:text-cyan-700 cursor-pointer" />
                </span>
              </div>
            </div>

            <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
              <Map size={16} className="mr-1" />
              KM: 79.000
            </span>
            <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
              <Droplet size={16} className="mr-1" />
              Gasolina Comum
            </span>
            <span className="flex mb-2 text-base font-normal leading-none text-red-400 ">
              <Banknote size={16} className="mr-1" color="red" />
              R$ 170.00
            </span>
          </li>
          <li className="mb-7 ms-8">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-red-300 rounded-full -start-3 ring-8 ring-white ">
              <Wallet size={18} color="white" />
            </span>

            <div className="flex items-center justify-between mb-1 text-lg font-semibold text-gray-900">
              <h3 className="truncate" title="SERVIÇO - Manutenção dos Freios">
                DESPESA - Seguro do Carro
              </h3>
              <div className="flex items-center text-center text-base font-normal leading-none text-gray-400">
                <Calendar size={16} className="mr-1 " />
                <span className="gap-3 flex ml-auto items-center text-center text-base font-normal leading-none text-gray-400 ">
                  13 jan 2024
                  <EllipsisVertical className="hover:text-cyan-700 cursor-pointer" />
                </span>
              </div>
            </div>

            <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
              <Map size={16} className="mr-1" />
              KM: 79.000
            </span>
            <span className="flex mb-2 text-base font-normal leading-none text-gray-400 ">
              <Droplet size={16} className="mr-1" />
              Gasolina Comum
            </span>
            <span className="flex mb-2 text-base font-normal leading-none text-red-400 ">
              <Banknote size={16} className="mr-1" color="red" />
              R$ 170.00
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default HistoryTimeline;
