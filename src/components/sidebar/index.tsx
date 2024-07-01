"use client";

import LogoMenu from "@/assets/logo-2.png";
import { MainNavigation, SecondNavigation } from "./NavigationMenu";
import PlanoWidget from "./planWidget";
import { useContext, useEffect } from "react";
import { UserContext } from "@/providers/user";
import ProfileSideBar from "./profileSideBar";
import ProfileSideBarSkeleton from "./profileSideBar/skeleton";
import "../scrollbar/scrollbar.css"; // Importa o arquivo CSS personalizado
import { X } from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const { UserLogged, user } = useContext(UserContext);

  useEffect(() => {
    if (user === null) {
      const fetchData = async () => {
        UserLogged();
      };

      fetchData();
    }
  }, []);

  return (
    <aside className="z-30 fixed flex flex-col border-r border-zinc-100 bg-zinc-50 px-6 py-3 shadow-xl max-[1500px]:gap-0 gap-7 h-full overflow-auto custom-scrollbar">
      <div className="h-14 relative max-[1500px]:mb-5 mb-1">
        <img src={LogoMenu.src} alt="Logo Menu Fkar" width={120} height={150} />
      </div>

      <button
        className="absolute left-64 top-6 hidden max-[811px]:block text-zinc-300 "
        onClick={onClose}
      >
        <X className="p-0.5 hover:text-green-700" />
      </button>

      <div className="flex flex-col gap-2">
        <MainNavigation />
      </div>

      <div className="mt-auto">
        <SecondNavigation />
      </div>

      <PlanoWidget />

      <div className="mt-2 mb-2 h-px bg-zinc-300" />

      {user === null ? (
        <ProfileSideBarSkeleton />
      ) : (
        <ProfileSideBar
          firstName={user?.firstName}
          lastName={user?.lastName}
          email={user?.email}
        />
      )}
    </aside>
  );
}
