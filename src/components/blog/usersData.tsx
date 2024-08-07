"use client";

import { UserContext } from "@/providers/user";
import { Search } from "lucide-react";
import { useContext, useEffect } from "react";
import LogoutButton from "../logout/button";

export default function UsersData() {
  const { listUsers, ListUsers } = useContext(UserContext);

  useEffect(() => {
    ListUsers();
  }, []);

  if (!listUsers) {
    return (
      <section className="flex flex-row mt-3 mx-10 items-center animate-pulse">
        <span className="">Dashboard admin</span>
        <LogoutButton />
      </section>
    );
  }

  return (
    <div className="mx-10">
      <span className="flex items-center border border-zinc-200 px-2 mb-4">
        <Search size={20} />
        <input
          placeholder="Pesquisar..."
          className="bg-transparent px-2 py-3 w-full outline-none"
        />
      </span>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b hidden lgg:table-cell">ID</th>
            <th className="py-2 px-4 border-b text-start">Nome</th>
            <th className="py-2 px-4 border-b text-start hidden slg:table-cell">
              Email
            </th>
            <th className="py-2 px-4 border-b text-start hidden lg:table-cell">
              CPF
            </th>
            <th className="py-2 px-4 border-b text-start hidden md:table-cell">
              Telefone
            </th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b text-center">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      user.isActive ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                </td>

                <td className="py-2 px-4 border-b hidden lgg:table-cell">
                  {user.id}
                </td>
                <td className="py-2 px-4 border-b">
                  <section className="flex flex-col">
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                    {new Date(user.created_at).toLocaleDateString("pt-BR")}
                  </section>
                </td>
                <td className="py-2 px-4 border-b hidden slg:table-cell">
                  {user.email}
                </td>
                <td className="py-2 px-4 border-b hidden lg:table-cell">
                  {user.cpf}
                </td>
                <td className="py-2 px-4 border-b hidden md:table-cell">
                  {user.phone}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
