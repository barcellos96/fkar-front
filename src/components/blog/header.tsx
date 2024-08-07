"use client";

import { Menu } from "lucide-react";
import LogoFkar from "../../assets/logo.png";
import { useState } from "react";
import Link from "next/link";

export default function HeaderBlog() {
  const [menu, setMenu] = useState(false);

  return (
    <div>
      <section className="flex flex-row items-center justify-between md:justify-around min-h-24 pr-5 shadow-sm md:mb-10 bg-zinc-50">
        <img src={LogoFkar.src} alt="Logo Fkar" className="pl-0 p-4 h-28" />

        <Menu
          onClick={() => setMenu((prev) => !prev)}
          className="border border-zinc-200 -mt-2 p-1 slg:hidden"
          size={35}
        />

        <section className="hidden slg:flex flex-row items-center justify-center gap-2 md:gap-6 pb-5">
          <Link href="/" className="hover:underline">
            Fkar Plataforma
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/cadastrar" className="hover:underline">
            <span className="text-white font-semibold bg-zinc-700 hover:bg-opacity-80 px-3 py-2 rounded-md">
              Cadastre-se
            </span>
          </Link>
        </section>
      </section>

      {menu && (
        <div className="bg-zinc-50 shadow-sm">
          <section className="flex flex-col gap-4 items-end -mt-5 px-7 pb-5">
            <Link href="/" className="hover:underline">
              Fkar Plataforma
            </Link>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <Link href="/cadastrar" className="hover:underline">
              <span className="text-white font-semibold bg-zinc-700 hover:bg-opacity-80 px-3 py-2 rounded-md">
                Cadastre-se
              </span>
            </Link>
          </section>
        </div>
      )}
    </div>
  );
}
