"use client";

import { CornerDownRight, Fuel, Plus, TrendingDown } from "lucide-react";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import IconAlarm from "../../../assets/icon-alarm.jpg";
import { NotDataTable } from "@/components/tablesNotData";
import HeaderComposition from "@/components/header/headerComposition";

interface Props {
  children?: ReactNode[];
  pagination?: ReactNode;
}

export default function ExpenseVehicleLayout({ children, pagination }: Props) {
  const { push } = useRouter();

  const handleSubmit = () => {
    push("/dashboard/despesas/criar");
  };

  return (
    <div className="w-full bg-white rounded-lg gap-4 px-6 py-5 mt-3 mb-5 shadow-lg ">
      <HeaderComposition
        icon={TrendingDown}
        title="Despesas"
        nameButton="Nova Despesa"
        typeSubmit="button"
        handleSubmit={handleSubmit}
        borderColor="border-red-700"
      />
      {children?.length === 0 ? (
        <div className="flex flex-col items-center justify-center pb-5">
          <NotDataTable.Root>
            <div className="flex items-center justify-between text-base uppercase font-bold bg-gray-50 w-full">
              <NotDataTable.Heade text="#" />
              <NotDataTable.Heade text="Descrição" />
              <NotDataTable.Heade text="Data" />
              <NotDataTable.Heade text="Tipo de Despesa" />
              <NotDataTable.Heade text="Hodometro(km)" />
              <NotDataTable.Heade text="Total" />
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
        <div>
          <table className="table-auto w-full">
            <thead>
              <tr className="hidden slg:table-row text-left">
                <th className="py-3">#</th>
                <th className="py-3">Descrição</th>
                <th className="py-3">Data</th>
                <th className="py-3">Tipo de Despesa</th>
                <th className="py-3">Hodometro</th>
                <th className="py-3">Total</th>

                <th className="text-right py-3 pr-8">{/* Ação */}</th>
              </tr>
            </thead>

            <tbody className="font-light text-base">{children}</tbody>
          </table>

          {pagination}
        </div>
      )}
    </div>
  );
}
