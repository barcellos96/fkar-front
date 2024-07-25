"use client";

import { TrendingDown } from "lucide-react";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import HeaderComposition from "@/components/header/headerComposition";
import SearchInput from "@/components/timeline/search";

interface Props {
  children?: ReactNode[];
  pagination?: ReactNode;
  searchInput?: ReactNode;
}

export default function ExpenseVehicleLayout({
  children,
  pagination,
  searchInput,
}: Props) {
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
      <div className="-ms-6 mb-4 max-w-[600px]">{searchInput}</div>
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
    </div>
  );
}
