"use client";

import {
  Map,
  CarFront,
  ChevronDown,
  RectangleHorizontal,
  Menu,
} from "lucide-react";
import { useState } from "react";
import Sidebar from "../sidebar";

export default function HeaderDashboardDefault() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleOpenMenu = () => setMenuOpen(true);
  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <div
      className="flex items-center justify-between shadow-lg rounded-xl w-full px-3 py-4 mt-3 bg-white"
      style={{ maxHeight: "10vh" }}
    >
      <div className="md:hidden cursor-pointer hover:bg-zinc-100 hover:opacity-70 p-2 rounded-lg transition duration-300 ease-linear">
        <Menu onClick={handleOpenMenu} />
      </div>

      {/*quando menu open */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <Sidebar onClose={handleCloseMenu} />

          <div
            className=" h-full bg-black bg-opacity-50 "
            onClick={handleCloseMenu}
          />
        </div>
      )}
      {/* ------------------------------*/}

      <div className="flex flex-row gap-1 items-center">
        <CarFront size={20} />
        <span className="text-sm font-medium truncate">Carro da Monica</span>
        <ChevronDown size={20} style={{ cursor: "pointer" }} />
        <div className="h-4 w-px bg-zinc-300" />
        <div className="relative items-center text-center top-3">
          <RectangleHorizontal size={25} />
          <span
            style={{
              position: "relative",
              fontSize: "8px",
              top: -28,
            }}
          >
            ABC
          </span>
        </div>
        <span className="text-sm ">MLN-8256</span>
        <div className="h-4 w-px bg-zinc-300" />
        <Map size={20} />
        <span className="text-sm">79.000</span>
      </div>
    </div>
  );
}
