"use client";

import { UserContext } from "@/providers/user";
import { LogOut, User } from "lucide-react";
import { useContext } from "react";

interface Props {
  onPopper: boolean;
  setOnPopper: () => void; // Função para atualizar o estado do modal
}

export default function PoppoverHeaderAvatar({ setOnPopper, onPopper }: Props) {
  const { user, Logout } = useContext(UserContext);

  return (
    <>
      <div
        onClick={setOnPopper}
        className={`${
          !onPopper && "hidden"
        } fixed inset-0 bg-black bg-opacity-10 z-40`}
      ></div>

      <div className="absolute text-center right-12 top-16 mt-1 bg-white rounded-lg min-w-[180px] z-50">
        <section className="flex flex-col text-start border-b border-zinc-200 p-4">
          <span className="font-semibold">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="font-extralight text-base">{user?.email}</span>
        </section>

        <ul className="flex flex-col text-start mt-4 mb-2">
          <li className=" cursor-pointer hover:bg-zinc-100 py-2 px-2">
            <a href="/dashboard/perfil" className="flex items-center gap-2">
              <User size={16} /> Meu Perfil
            </a>
          </li>
          <li
            onClick={Logout}
            className="flex items-center gap-2 cursor-pointer hover:bg-zinc-100 py-2 px-2.5"
          >
            <LogOut size={16} />
            Sair
          </li>
        </ul>
      </div>
    </>
  );
}
