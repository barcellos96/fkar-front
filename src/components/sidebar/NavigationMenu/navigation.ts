import {
  User,
  Car,
  ListIcon,
  BadgeHelp,
  Settings,
  Bell,
  Fuel,
  Wallet,
  Wrench,
  AlarmClock,
  CornerDownRight,
  TrendingUp,
} from "lucide-react";

export const navigationMain = [
  {
    name: "Inicio",
    icon: CornerDownRight,
    path: "/dashboard",
  },
  {
    name: "Histórico",
    icon: ListIcon,
    path: "/dashboard/historico",
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
  // {
  //   name: "Relatorios",
  //   icon: TrendingUp,
  //   path: "/dashboard/relatorios",
  // },
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
  // {
  //   name: "Suporte",
  //   icon: BadgeHelp,
  //   path: "/suporte",
  // },
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
