"use client";

import { AlarmClock, Fuel, Wallet, Wrench } from "lucide-react";
import { usePathname } from "next/navigation";

interface Props {
  onPopper: boolean;
}

const navigationPoppoverButtonFloat = [
  {
    name: "Abastecimentos",
    icon: Fuel,
    path: "/dashboard/abastecimento/criar",
  },
  {
    name: "Despesas",
    icon: Wallet,
    path: "/dashboard/despesas/criar",
  },
  {
    name: "Manutenções",
    icon: Wrench,
    path: "/dashboard/manutencoes/criar",
  },
  {
    name: "Receitas",
    icon: Wallet,
    path: "/dashboard/receitas/criar",
  },
  {
    name: "Lembretes",
    icon: AlarmClock,
    path: "/dashboard/lembretes",
  },
];

export default function PoppoverButtonFloat({ onPopper }: Props) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`${
          !onPopper && "hidden"
        } fixed inset-0 bg-black bg-opacity-10 `}
      ></div>
      <div
        className={`${
          !onPopper && "hidden"
        } md:hidden fixed bottom-20 right-14 mb-2 w-auto flex flex-col gap-4 ps-3 pe-10 py-6 items-start bg-white shadow-lg rounded-lg`}
      >
        {navigationPoppoverButtonFloat.map((item, index) => (
          <section
            key={index}
            className={`${
              item.path === pathname && "border-l border-green-700 bg-green-50"
            }  text-base font-medium text-zinc-500 rounded  px-3 py-3 border-l border-green-700 hover:bg-green-100 transition duration-300 ease-linear`}
          >
            <a href={item.path} className="flex">
              {
                <item.icon
                  size={18}
                  className="mr-2 text-zinc-700 hover:text-green-700"
                />
              }{" "}
              {item.name}
            </a>
          </section>
        ))}
      </div>
    </>
  );
}
