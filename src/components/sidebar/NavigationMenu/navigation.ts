import {
  User,
  Car,
  Plus,
  ListIcon,
  BadgeHelp,
  Settings,
  Bell,
} from "lucide-react";

export const navigationMain = [
  {
    name: "Histórico",
    icon: ListIcon,
    path: "/dashboard",
  },
  {
    name: "Adicionar",
    icon: Plus,
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
    name: "configuração",
    icon: Settings,
    path: "/dashboard/config",
  },
  {
    name: "Suporte",
    icon: BadgeHelp,
    path: "/suporte",
  },
];
