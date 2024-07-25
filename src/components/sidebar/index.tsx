"use client";

import LogoMenu from "@/assets/logo-2.png";
import { MainNavigation, SecondNavigation } from "./NavigationMenu";
import PlanoWidget from "./planWidget";
import { useContext, useEffect } from "react";
import { UserContext } from "@/providers/user";
import ProfileSideBar from "./profileSideBar";
import ProfileSideBarSkeleton from "./profileSideBar/skeleton";
import "../scrollbar/scrollbar.css"; // Importa o arquivo CSS personalizado
import { useRouter } from "next/navigation";

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const { push } = useRouter();
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
    <aside className="min-w-72 z-30 fixed flex flex-col border-r border-zinc-100 bg-zinc-50 px-6 py-3 shadow-xl gap-7 h-full overflow-auto overflow-x-hidden custom-scrollbar ">
      <img
        src={LogoMenu.src}
        alt="Logo Menu Fkar"
        className="cursor-pointer"
        width={120}
        height={150}
        onClick={() => push("/dashboard")}
      />

      <div className="flex flex-col gap-2">
        <MainNavigation />
        <SecondNavigation />
      </div>

      <div className=" mb-2 h-px bg-zinc-300 mt-auto" />

      <PlanoWidget />
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
