"use client";

import LogoutButton from "@/components/logout/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeaderAdmin() {
  const { push } = useRouter();
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    const pathname = window.location.pathname;
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    setPathname(lastPart);
  }, []);

  return (
    <div>
      <section className="flex flex-row mt-3 mx-10 items-center">
        <span className="">Dashboard admin</span>
        <LogoutButton />
      </section>

      <div className="pt-12 mx-10">
        {pathname === "admin" ? (
          <section className="flex gap-3 items-center">
            <h1 className="font-semibold mb-6 text-xl underline">Usuários</h1>
            <h2
              onClick={() => push("/dashboard/admin/blog")}
              className="font-semibold mb-6 text-xl hover:underline cursor-pointer"
            >
              Posts Blog
            </h2>
          </section>
        ) : (
          <section className="flex gap-3 items-center">
            <h1 className="font-semibold mb-6 text-xl underline">Posts Blog</h1>
            <h2
              onClick={() => push("/dashboard/admin")}
              className="font-semibold mb-6 text-xl hover:underline cursor-pointer"
            >
              Usuários
            </h2>
          </section>
        )}
        {pathname === "blog" && (
          <button
            onClick={() => push("/dashboard/admin/blog/criar")}
            className="bg-green-700 text-white hover:bg-opacity-50 transition-all duration-500 px-3 py-2 rounded-lg cursor-pointer"
          >
            Criar Post
          </button>
        )}
      </div>
    </div>
  );
}
