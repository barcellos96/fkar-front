"use client";

import { Menu } from "lucide-react";
import Sidebar from "@/components/sidebar";
import Content from "./headerDashboardDefault/contentHeaderDashboard";
import { useState } from "react";

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

      {/*quando menu open*/}
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
      <Content />
    </div>
  );
}
