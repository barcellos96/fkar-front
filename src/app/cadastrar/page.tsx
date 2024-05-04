import { Metadata } from "next";

import AuthLayout from "@/components/layout/authLayout";
import FormsRegister from "@/components/forms/register";

export const metadata: Metadata = {
  title: "Login - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function Cadastrar() {
  return (
    <AuthLayout>
      <FormsRegister />
    </AuthLayout>
  );
}
