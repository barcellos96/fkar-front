"use client";

import Link from "next/link";
import { navigationMain, navigationPoppoverSideBar } from "./navigation";
import { usePathname } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

interface NavigationItem {
  name: string;
  icon: React.ElementType;
  path?: string;
}

type NavigationList = NavigationItem[];

export function MainNavigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCloseMenu = () => setMenuOpen(false);

  const renderLevels = (data: NavigationList) => {
    return data.map((item, index) => {
      return (
        <Link
          key={index}
          href={item.path ?? "#"}
          className={`${
            item.path === pathname && "border-l border-green-700 bg-zinc-100"
          } flex text-base font-medium text-zinc-800 rounded px-3 py-3 hover:bg-zinc-100 transition duration-300 ease-linear`}
        >
          {<item.icon size={18} className="mr-2" />}
          {item.name}
        </Link>
      );
    });
  };

  const renderLevelsPoppoverSideBar = (data: NavigationList) => {
    return (
      <div className="relative">
        {/* Overlay semitransparente */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-15 z-30"
            onClick={handleCloseMenu} // Fechar o menu quando o overlay é clicado
          />
        )}

        <button
          id="btn-add"
          className={`${
            menuOpen ? "text-green-900" : "text-gray-900"
          } inline-flex w-full rounded-md px-4 py-3 bg-green-100 text-base  font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500`}
          onClick={() => setMenuOpen(!menuOpen)} // Alterna o estado do menu ao clicar no botão
        >
          <PlusCircle className="h-5 w-5 mr-1" />
          Adicionar
        </button>
        {menuOpen && (
          <section className="absolute z-30 w-60 mt-1 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-3">
              {data.map((item, index) => (
                <Link
                  key={index}
                  href={item.path ?? "#"}
                  className={`${
                    item.path === pathname &&
                    "border-l border-green-700 bg-green-50"
                  }
                  flex text-gray-700 px-4 py-3 text-base hover:bg-gray-100
                  `}
                >
                  {<item.icon size={18} className="mr-2" />}
                  {item.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  };

  return (
    <>
      {renderLevelsPoppoverSideBar(navigationPoppoverSideBar)}
      {renderLevels(navigationMain)}
    </>
  );
}
