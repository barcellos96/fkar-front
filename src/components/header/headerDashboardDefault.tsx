"use client";

import { BadgeHelp, Bell, Menu } from "lucide-react";
import Sidebar from "@/components/sidebar";
import Content from "./headerDashboardDefault/contentHeaderDashboard";
import { useState } from "react";
import AvatarLayout from "../avatar";
import { useRouter } from "next/navigation";
import HelpContent from "./help";
import NotificationContent from "./notification";

export default function HeaderDashboardDefault() {
  const { push } = useRouter();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState<string | null>(null);

  const handleOpenMenu = () => setMenuOpen(true);
  const handleCloseMenu = () => setMenuOpen(false);

  const handlePopoverToggle = (popover: string) => {
    setPopoverOpen((prevPopover) => (prevPopover === popover ? null : popover));
  };

  const handleClosePopover = () => setPopoverOpen(null);

  return (
    <div
      className="flex items-center justify-between shadow-lg rounded-xl w-full px-3 py-4 mt-3 bg-white"
      style={{ maxHeight: "10vh" }}
    >
      <section className="flex items-center">
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
      </section>
      <section className="flex items-center gap-3">
        <div className="relative">
          <Bell
            size={18}
            onClick={() => handlePopoverToggle("bell")}
            className="cursor-pointer"
          />
          {popoverOpen === "bell" && (
            <NotificationContent handleClosePopover={handleClosePopover} />
          )}
        </div>
        <div className="relative">
          <BadgeHelp
            size={18}
            onClick={() => handlePopoverToggle("help")}
            className="cursor-pointer"
          />
          {popoverOpen === "help" && (
            <HelpContent handleClosePopover={handleClosePopover} />
          )}
        </div>
        <AvatarLayout />
      </section>
    </div>
  );
}
