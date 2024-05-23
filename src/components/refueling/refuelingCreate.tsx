"use client";

import { ChevronLeft, SendToBack, SkipBack } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ExpenseRefuelingCreate() {
  const { back } = useRouter();
  return (
    <div className="w-full bg-white rounded-lg gap-4 px-6 py-5 mt-3 mb-5 shadow-lg ">
      <section className="flex flex-col gap-3">
        <span
          className="flex items-center w-20 font-light cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            back();
          }}
        >
          <ChevronLeft width={22} height={22} /> Voltar
        </span>

        <h1 className="ms-2 mt-4 font-semibold">Cadastrar Abastecimento</h1>
      </section>
    </div>
  );
}
