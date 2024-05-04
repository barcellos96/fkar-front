import { Metadata } from "next";

import FormsLogin from "@/components/forms/login";
import AuthLayout from "@/components/layout/authLayout";

export const metadata: Metadata = {
  title: "Login - Fkar Plataforma",
  description: "Gestão de veículos",
};

export default function Login() {
  return (
    <AuthLayout>
      <FormsLogin />
    </AuthLayout>
  );
}
