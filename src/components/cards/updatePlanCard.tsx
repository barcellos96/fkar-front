"use client";
import React from "react";
import "../scrollbar/scrollbar.css"; // Importa o arquivo CSS personalizado
import updatePlan from "../../assets/upgrade-pro.png";
import { useRouter } from "next/navigation";

const UpdatePlanCard = () => {
  const { push } = useRouter();

  return (
    <div
      id="plan-navigation"
      className="relative lg:mt-5 -mt-5 flex flex-col py-5 bg-gradient-to-br from-green-400 to-blue-200 rounded-xl shadow-lg"
    >
      <h2 className="ml-6 font-bold max-w-44 text-white">
        Atualize seu plano para ter mais recursos
        <button
          type="button"
          className="min-w-40 rounded bg-green-700 text-white text-sm py-2 px-5 mt-2 hover:opacity-80 transition duration-300 ease-linear"
          onClick={() => push("/dashboard/perfil")}
        >
          FAZER UPGRADE
        </button>
      </h2>
      <img
        src={updatePlan.src}
        alt="upgrade plan"
        width={120}
        height={150}
        className="absolute right-10"
      />
    </div>
  );
};

export default UpdatePlanCard;
