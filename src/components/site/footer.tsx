"use client";

import { Instagram } from "lucide-react";
import Logo from "../../assets/logo.png";
import { MouseEvent } from "react";

export default function Footer() {
  const handleScrollToSection = (
    e: MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-zinc-700 text-white pt-8 pb-20 px-10 slg:px-32 mt-10">
      <div className="container mx-auto flex flex-col slg:flex-row items-center slg:items-start justify-between gap-10 space-y-4">
        <div className="flex flex-col items-center slg:items-start text-center slg:text-start">
          <img
            src={Logo.src}
            alt="Logo"
            className="flex items-center slg:-ml-10 h-24 -mb-2"
          />
          <span>Todos direitos reservados | Fkar Gestão de Veiculos</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col">
          <section className="flex flex-col gap-2">
            <a
              href="#serviços"
              className="hover:underline"
              onClick={(e) => handleScrollToSection(e, "serviços")}
            >
              Serviços
            </a>
            <a
              href="#planos"
              className="hover:underline"
              onClick={(e) => handleScrollToSection(e, "planos")}
            >
              Planos
            </a>
            <a
              href="#duvidas"
              className="hover:underline"
              onClick={(e) => handleScrollToSection(e, "duvidas")}
            >
              FAQ
            </a>
            <a
              href="#contato"
              className="hover:underline"
              onClick={(e) => handleScrollToSection(e, "contato")}
            >
              Contato
            </a>
          </section>

          <div className="flex mt-5">
            <a
              href="https://instagram.com/fkar.oficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-6 h-6 text-white hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
