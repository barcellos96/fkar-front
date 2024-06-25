"use client";

import { TrendingDown, Wrench } from "lucide-react";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import HeaderComposition from "@/components/header/headerComposition";

interface Props {
  children?: ReactNode[];
  pagination?: ReactNode;
}

export default function ExpenseMaintenanceLayout({
  children,
  pagination,
}: Props) {
  const { push } = useRouter();

  const handleSubmit = () => {
    push("/dashboard/manutencoes/criar");
  };

  return (
    <div className="w-full bg-white rounded-lg gap-4 px-6 py-5 mt-3 mb-5 shadow-lg ">
      <HeaderComposition
        icon={Wrench}
        title="Manutenções"
        nameButton="Nova Manutenção"
        typeSubmit="button"
        handleSubmit={handleSubmit}
        borderColor="border-red-700"
      />

      <div>
        <table className="table-auto w-full">
          <thead>
            <tr className="hidden slg:table-row text-left">
              <th className="py-3">#</th>
              <th className="py-3">Descrição</th>
              <th className="py-3">Data</th>
              <th className="py-3">Hodometro</th>
              <th className="py-3">Total</th>

              <th className="text-right py-3 pr-8">{/* Ação */}</th>
            </tr>
          </thead>

          <tbody className="font-light text-base">{children}</tbody>
        </table>

        {pagination}
      </div>
    </div>
  );
}
