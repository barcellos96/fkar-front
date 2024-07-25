"use client";

import { Menu } from "lucide-react";
import LogoFkar from "../../assets/logo.png";
import { MouseEvent, useState } from "react";

export default function HeaderSite() {
  const [menu, setMenu] = useState(false);

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
    <div>
      <section className="flex flex-row items-center justify-between md:justify-around min-h-24 pr-5 shadow-sm md:mb-10">
        <img src={LogoFkar.src} alt="Logo Fkar" className="pl-0 p-4 h-28" />

        <Menu
          onClick={() => setMenu((prev) => !prev)}
          className="border border-zinc-200 -mt-2 p-1 slg:hidden"
          size={35}
        />

        <section className="hidden slg:flex flex-row items-center justify-center gap-2 md:gap-6 pb-5">
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
          <a href="/login" className="hover:underline">
            <span className="text-white font-semibold bg-zinc-700 px-3 py-2 rounded-md">
              Fazer Login
            </span>
          </a>
        </section>
      </section>

      {menu && (
        <div className="bg-white shadow-lg">
          <section className="flex flex-col gap-2 items-end -mt-5 px-7 pb-5">
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
            <a href="/login" className="hover:underline mt-2">
              <span className="text-white font-semibold bg-zinc-700 px-3 py-2 rounded-md">
                Fazer Login
              </span>
            </a>
          </section>
        </div>
      )}
    </div>
  );
}
