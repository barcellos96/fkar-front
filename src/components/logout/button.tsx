"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";
import { useEffect } from "react";

export default function LogoutButton() {
  const { push } = useRouter();
  const { "user:accessToken": token } = parseCookies();

  const handleLogout = () => {
    destroyCookie(undefined, "user:accessToken");
    push("/login");
  };

  useEffect(() => {
    if (!token) {
      push("/login");
    }
  }, [token]); // Executa apenas uma vez, após a renderização inicial

  return (
    <button
      type="button"
      className="ml-auto rounded-md hover:bg-zinc-200 p-2"
      onClick={handleLogout}
    >
      <LogOut width={18} height={18} />
    </button>
  );
}
