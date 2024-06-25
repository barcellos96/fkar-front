"use client";

import { Crown, Lock, Map, User } from "lucide-react";
import { useEffect, useState } from "react";
import MyAccount from "./myAccount";
import MyAccountSkeleton from "./myAccount/skeleton";
import Address from "./address";
import ChangePassword from "./password";

const tabList = [
  {
    id: 1,
    name: "Planos FKar",
    Icon: Crown,
  },
  {
    id: 2,
    name: "Minha Conta",
    Icon: User,
  },
  {
    id: 3,
    name: "Endereço",
    Icon: Map,
  },
  {
    id: 4,
    name: "Senha",
    Icon: Lock,
  },
];

export default function ProfileLayout() {
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive("Minha Conta");
  }, []);

  return (
    <div className="grid grid-cols-profileLayoutSm slg:grid-cols-profileLayout py-3 rounded-lg gap-4">
      {/* Left side */}
      <div className="flex flex-col py-5 bg-white my-4 slg:my-0 rounded-xl shadow-lg max-h-56">
        {tabList.map(({ id, name, Icon }) => {
          return (
            <button
              key={id}
              className={`flex items-center px-5  font-light text-base hover:border-l-green-700 hover:border-l-2 hover:bg-green-100 p-3 ${
                active === name && `border-l-green-700 border-l-2 bg-green-100`
              }`}
              onClick={() => setActive(name)}
            >
              <Icon size={14} className="mr-2" /> {name}
            </button>
          );
        })}
      </div>

      {/* Right side */}
      {!active ? (
        <div className="bg-white rounded-xl shadow-lg p-5">
          <MyAccountSkeleton />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-5">
          {active === tabList[0].name && <span>Planos FKar</span>}
          {active === tabList[1].name && <MyAccount />}
          {active === tabList[2].name && <Address />}
          {active === tabList[3].name && <ChangePassword />}
        </div>
      )}
    </div>
  );
}
