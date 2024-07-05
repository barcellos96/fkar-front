"use client";

import { TrendingUp } from "lucide-react";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import HeaderComposition from "@/components/header/headerComposition";

interface Props {
  children?: ReactNode[];
  pagination?: ReactNode;  
}

export default function IncomingLayout({ children, pagination }: Props) {
  const { push } = useRouter();

  const handleSubmit = () => {
    push("/dashboard/receitas/criar");
  };

  return (
    <div className="w-full bg-white rounded-lg gap-4 px-6 py-5 mt-3 mb-5 shadow-lg ">
      <HeaderComposition
        icon={TrendingUp}
        title="Receitas"
        nameButton="Nova Receita"
        typeSubmit="button"
        handleSubmit={handleSubmit}
      />

      <div>
        <table className="table-auto w-full">
          <thead>
            <tr className="hidden slg:table-row text-left">
              <th className="py-3">#</th>
              <th className="py-3">Data</th>
              <th className="py-3">Descrição</th>
              <th className="py-3">Tipo de Receita</th>
              <th className="py-3">Valor</th>
              <th className="py-3">Hodometro</th>

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
