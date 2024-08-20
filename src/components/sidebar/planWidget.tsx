"use client";
import { useRouter } from "next/navigation";

export default function PlanoWidget() {
  const { push } = useRouter();

  return (
    <div className="flex flex-col rounded-lg bg-green-100 max-w-60 px-2 py-3 gap-1 shadow-md">
      {/* <span className="text-sm font-bold text-green-700">
        SEU PLANO: <span className="text-zinc-600">GRATUITO</span>
      </span> */}

      <button
        type="button"
        className="rounded bg-green-700 text-white text-sm py-2  hover:bg-green-800"
        onClick={() => push("/dashboard/perfil")}
      >
        FAZER UPGRADE
      </button>
    </div>
  );
}
