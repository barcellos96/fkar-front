import { ReactNode } from "react";
import Logo from "../../assets/logo.png";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center sm:items-stretch lg:flex-row bg-white">
      {/* Lado esquerdo */}
      <div className="flex items-center justify-center w-auto h-auto lg:w-1/2 sm:bg-green-100 md:flex ">
        <img
          src={Logo.src}
          alt="Logo Fkar Plataforma"
          width={400}
          height={500}
          className="w-auto h-auto sm:w-96"
        />
      </div>

      {/* Lado direito */}
      <div className="flex flex-col items-center justify-center lg:w-1/2 sm:p-8">
        {children}
      </div>
    </div>
  );
}
