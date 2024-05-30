"use client";
import { UserContext } from "@/providers/user";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";
import { useContext, useEffect } from "react";

export default function LogoutButton() {
  const { push } = useRouter();
  const { Logout } = useContext(UserContext);
  const { "user:accessToken": token } = parseCookies();

  useEffect(() => {
    if (!token) {
      push("/login");
    }
  }, [token, push]); // Executa apenas uma vez, após a renderização inicial

  return (
    <button
      type="button"
      className="ml-auto rounded-md hover:bg-zinc-200 p-2"
      onClick={Logout}
    >
      <LogOut width={18} height={18} />
    </button>
  );
}
