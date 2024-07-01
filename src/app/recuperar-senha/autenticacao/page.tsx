import { Metadata } from "next";

import AuthLayout from "@/components/layout/authLayout";
import FormsAuthentication from "@/components/forgotPassword/autentication";

export const metadata: Metadata = {
  title: "Login - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function Autenticacao() {
  return (
    <AuthLayout>
      <FormsAuthentication />
    </AuthLayout>
  );
}
