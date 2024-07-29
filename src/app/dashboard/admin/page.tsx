"use client";

import LogoutButton from "@/components/logout/button";
import { UserContext } from "@/providers/user";
import { Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";

export default function Admin() {
  const { listUsers, ListUsers } = useContext(UserContext);

  const [query, setQuery] = useState("");

  useEffect(() => {
    ListUsers();
  }, []);

  //fazer filter
  // const filteredUsers = listUsers?.filter(
  //   (user) =>

  // );

  // console.log("filteredUsers", filteredUsers);

  return (
    <div className="flex flex-col ms-6">
      {/* header */}
      <section className="flex flex-row mt-3 mx-10 items-center">
        <span className="">Dashboard admin</span>
        <LogoutButton />
      </section>

      <div className="pt-12 mx-10">
        <h1 className="font-semibold mb-6 text-xl underline">Usuários</h1>

        <span className="flex items-center border border-zinc-200 px-2 mb-4">
          <Search size={20} />
          <input
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar..."
            className="bg-transparent px-2 py-3 w-full outline-none"
          />
        </span>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b text-start">Nome</th>
              <th className="py-2 px-4 border-b text-start">Email</th>
              <th className="py-2 px-4 border-b text-start">CPF</th>
              <th className="py-2 px-4 border-b text-start">Telefone</th>
              <th className="py-2 px-4 border-b text-start">Criado em</th>
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
                  <td className="py-2 px-4 border-b">{user.id}</td>
                  <td className="py-2 px-4 border-b">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.cpf}</td>
                  <td className="py-2 px-4 border-b">{user.phone}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(user.created_at).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
