"use client";

import { Fuel } from "lucide-react";
import HeaderComposition from "../../header/headerComposition";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children?: ReactNode[];
  pagination?: ReactNode;
}

export default function RefulingLayout({ children, pagination }: Props) {
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
        borderColor="border-orange-500"
      />

      <div>
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

        {pagination}
      </div>
    </div>
  );
}
