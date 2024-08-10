"use client";

import Link from "next/link";
import Logo from "../../assets/logo_blog-rmbg.png";
import { Instagram } from "lucide-react";
import { useContext } from "react";
import { BlogContext } from "@/providers/blog";

export default function FooterBlog() {
  const { categories, setCategorieId, singleCategorie, Post } =
    useContext(BlogContext);

  return (
    <footer className="bg-zinc-100 text-zinc-600 pt-8 pb-10 px-10 md:px-32 mt-10">
      <div className="flex flex-col lg:flex-row gap-6  items-center mb-14">
        <div className="flex flex-col gap-4 flex-1 max-w-[450px]">
          <section className="flex flex-col gap-3">
            <h3 className="font-semibold text-xl">Sobre nós</h3>
            <span className="font-light text-lg">
              A <strong className="font-semibold">FKAR</strong> é uma plataforma
              dedicada à gestão eficiente de veículos, permitindo que os
              usuários acompanhem e compreendam seus gastos e ganhos por meio de
              registros simples e intuitivos. Com foco na transparência e
              facilidade de uso, a fkar oferece uma solução web robusta, que
              também pode ser baixada
            </span>
          </section>

          <section className="flex flex-row items-center gap-1">
            <span className="font-semibold text-lg">Email:</span>
            <span>contato@fkar.com.br</span>
          </section>
        </div>

        <section className="flex flex-col slg:flex-row lgg:hidden gap-10">
          <div className="flex flex-row flex-1 justify-end gap-20">
            <section className="flex flex-col gap-2">
              <span className="font-semibold text-xl">Acesso Rápido</span>
              <section className="flex flex-col gap-2">
                <Link href="/" className="hover:opacity-65">
                  Fkar Plataforma
                </Link>
                <Link href="/blog" className="hover:opacity-65">
                  Blog
                </Link>
                <Link href="/login" className="hover:opacity-65">
                  Login
                </Link>
                <Link href="/cadastrar" className="hover:opacity-65">
                  Cadastro
                </Link>
              </section>
            </section>

            <section className="flex flex-col gap-2">
              <span className="font-semibold text-xl">Categorias</span>
              <section className="flex flex-col gap-2">
                {categories.map((item) => (
                  <Link
                    key={item.id}
                    href="#"
                    className="hover:opacity-65"
                    onClick={() => setCategorieId(item.id)}
                  >
                    {item.name}
                  </Link>
                ))}
              </section>
            </section>
          </div>

          <div className="flex flex-col flex-1 justify-start items-start slg:items-center h-40">
            <section className="flex flex-col">
              <span className="font-semibold text-xl mb-4">Redes Sociais</span>
              <a
                href="https://instagram.com/fkar.oficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6 hover:text-gray-400" />
              </a>
            </section>
          </div>
        </section>

        <div className="hidden lgg:flex flex-row flex-1 justify-end gap-20">
          <section className="flex flex-col gap-2">
            <span className="font-semibold text-xl">Acesso Rápido</span>
            <section className="flex flex-col gap-2">
              <Link href="/" className="hover:opacity-65">
                Fkar Plataforma
              </Link>
              <Link href="/blog" className="hover:opacity-65">
                Blog
              </Link>
              <Link href="/login" className="hover:opacity-65">
                Login
              </Link>
              <Link href="/cadastrar" className="hover:opacity-65">
                Cadastro
              </Link>
            </section>
          </section>

          <section className="flex flex-col gap-2">
            <span className="font-semibold text-xl">Categorias</span>
            <section className="flex flex-col gap-2">
              {categories.map((item) => (
                <Link
                  key={item.id}
                  href="#"
                  className="hover:opacity-65"
                  onClick={() => setCategorieId(item.id)}
                >
                  {item.name}
                </Link>
              ))}
            </section>
          </section>
        </div>

        <div className="hidden lgg:flex flex-col flex-1 justify-start items-start slg:items-center h-40">
          <section className="flex flex-col">
            <span className="font-semibold text-xl mb-4">Redes Sociais</span>
            <a
              href="https://instagram.com/fkar.oficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-6 h-6 hover:text-gray-400" />
            </a>
          </section>
        </div>
      </div>

      <div className="border border-zinc-300 opacity-40 w-[94%]" />

      <div className="container mx-auto flex flex-col slg:flex-row items-center slg:items-start justify-between gap-10 mt-6">
        <div className="flex flex-col items-center slg:items-start text-center slg:text-start">
          <img
            src={Logo.src}
            alt="Logo"
            className="flex items-center slg:-ml-2 h-10 -mb-2"
          />
          <section className="flex flex-col lgg:flex-row gap-2 text-base font-light mt-2">
            <span>Todos direitos reservados </span>
            <span className="hidden lgg:flex">||</span>
            <span>© Fkar Gestão de Veiculos - 2024</span>
          </section>
        </div>

        {/* Navigation Links */}
      </div>
    </footer>
  );
}
