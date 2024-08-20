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
    color: "bg-orange-300",
  },
  {
    name: "Despesas",
    icon: Wallet,
    path: "/dashboard/despesas/criar",
    color: "bg-red-700",
  },
  {
    name: "Manutenções",
    icon: Wrench,
    path: "/dashboard/manutencoes/criar",
    color: "bg-yellow-400",
  },
  {
    name: "Receitas",
    icon: Wallet,
    path: "/dashboard/receitas/criar",
    color: "bg-green-400",
  },
  {
    name: "Lembretes",
    icon: AlarmClock,
    path: "/dashboard/lembretes",
    color: "bg-blue-700",
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
            }  text-base font-medium text-zinc-500 rounded  px-2 py-1 hover:bg-green-100 transition duration-300 ease-linear`}
          >
            <a href={item.path} className="flex items-center  gap-2">
              {
                <section
                  className={`flex items-center justify-center ${item.color} px-2 py-2 rounded-full`}
                >
                  <item.icon
                    size={18}
                    className="text-white hover:text-green-700"
                  />
                </section>
              }
              {item.name}
            </a>
          </section>
        ))}
      </div>
    </>
  );
}
