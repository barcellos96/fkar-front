import {
  User,
  Car,
  Plus,
  ListIcon,
  BadgeHelp,
  Settings,
  Bell,
  Fuel,
  Wallet,
  Wrench,
  AlarmClock,
} from "lucide-react";

export const navigationMain = [
  {
    name: "Histórico",
    icon: ListIcon,
    path: "/dashboard",
  },

  {
    name: "Meus Veiculos",
    icon: Car,
    path: "/dashboard/meus-veiculos",
  },
  {
    name: "Lembretes",
    icon: Bell,
    path: "/dashboard/lembretes",
  },
  {
    name: "Perfil",
    icon: User,
    path: "/dashboard/perfil",
  },
];

export const navigationSecond = [
  {
    name: "Configurações",
    icon: Settings,
    path: "/dashboard/config",
  },
  {
    name: "Suporte",
    icon: BadgeHelp,
    path: "/suporte",
  },
];

export const navigationPoppoverSideBar = [
  {
    name: "Abastecimentos",
    icon: Fuel,
    path: "/dashboard/abastecimento",
  },
  {
    name: "Despesas",
    icon: Wallet,
    path: "/dashboard/despesas",
  },
  {
    name: "Manutenções",
    icon: Wrench,
    path: "/dashboard/manutencoes",
  },
  {
    name: "Receitas",
    icon: Wallet,
    path: "/dashboard/receitas",
  },
  {
    name: "Lembretes",
    icon: AlarmClock,
    path: "/dashboard/lembretes",
  },
];
