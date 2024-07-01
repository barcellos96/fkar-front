import { Metadata } from "next";

import AuthLayout from "@/components/layout/authLayout";
import FormsForgotPassword from "@/components/forgotPassword/formsForgot";

export const metadata: Metadata = {
  title: "Login - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function RecuperarSenha() {
  return (
    <AuthLayout>
      <FormsForgotPassword />
    </AuthLayout>
  );
}
