"use client";

import { Fuel, FuelIcon, Plus } from "lucide-react";
import HeaderComposition from "../header/headerComposition";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { NotDataTable } from "../tablesNotData";
import IconAlarm from "../../assets/icon-alarm-calendar.png";

interface Props {
  children: ReactNode[];
}

export default function RefulingLayout({ children }: Props) {
  const { push } = useRouter();

  const handleSubmit = () => {
    push("/dashboard/abastecimento/criar");
  };

  return (
    <div className="w-full bg-white rounded-lg gap-4 px-6 py-5 mt-3 mb-5 shadow-lg ">
      <HeaderComposition
        icon={Fuel}
        title="abastecimento"
        nameButton="Novo Abastecimento"
        typeSubmit="button"
        handleSubmit={handleSubmit}
      />
      {children.length === 0 ? (
        <div className="flex flex-col items-center justify-center pb-5">
          <NotDataTable.Root>
            <div className="flex items-center justify-between text-base uppercase font-bold bg-gray-50 w-full">
              <NotDataTable.Heade text="#" />
              <NotDataTable.Heade text="Data" />
              <NotDataTable.Heade text="Combustível" />
              <NotDataTable.Heade text="Preço / L" />
              <NotDataTable.Heade text="Litros" />
              <NotDataTable.Heade text="Total" />
              <NotDataTable.Heade text="Hodometro(km)" />
              <NotDataTable.Heade text="" />
            </div>
            <NotDataTable.Body
              img={IconAlarm}
              // actionButton={handleOpenModal}
              icon={Plus}
              title="Abastecimento"
            />
          </NotDataTable.Root>
        </div>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr className="hidden slg:table-row text-left">
              <th className="py-3">#</th>
              <th className="py-3">Data</th>
              <th className="py-3 ">Combustível</th>
              <th className="py-3 ">Preço / L</th>
              <th className="py-3 ">Litros</th>
              <th className="py-3">Total</th>
              <th className="py-3 hidden lg:table-cell">Hodometro</th>

              {/* <th className="py-3">Descrição</th> */}
              <th className="text-right py-3 pr-8">{/* Ação */}</th>
            </tr>
          </thead>

          <tbody className="font-light text-base">{children}</tbody>
        </table>
      )}
    </div>
  );
}
