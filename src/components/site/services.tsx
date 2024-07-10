"use client";

import {
  MoveLeft,
  MoveRight,
  Fuel,
  Wrench,
  CreditCard,
  Bell,
  FileText,
  History,
  User,
  TrendingUp,
  Smile,
} from "lucide-react";

import Smartmockup from "../../assets/smartmockups_3_em_1.png";
import { useRouter } from "next/navigation";

export default function Services() {
  const { push } = useRouter();

  return (
    <div
      id="serviços"
      className="flex flex-col items-center mt-6 py-8 bg-white  rounded-lg"
    >
      <h2 className="text-2xl lg:text-3xl font-bold mb-1 text-zinc-800">
        Como iremos te ajudar?
      </h2>
      <span className="flex items-center gap-3 text-lg lg:text-xl font-light mb-8 lg:mb-16 text-zinc-600">
        <MoveRight className="text-green-700" /> Nossos serviços
        <MoveLeft className="text-green-700" />
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-6 max-w-7xl md:max-w-5xl">
        <div className="flex flex-col items-center p-4 bg-zinc-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <Fuel className="text-green-700 mb-2" size={32} />
          <p className="text-center text-zinc-700 font-medium md:text-xl uppercase">
            Cadastro de Abastecimento
          </p>
          <p className="text-center text-zinc-500 text-base mt-3 md:text-lg">
            Registre e acompanhe todos os seus abastecimentos de forma fácil e
            rápida.
          </p>
        </div>
        <div className="flex flex-col items-center p-4 bg-zinc-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <Wrench className="text-green-700 mb-2" size={32} />
          <p className="text-center text-zinc-700 font-medium md:text-xl uppercase">
            Cadastro de Serviços
          </p>
          <p className="text-center text-zinc-500 text-base mt-3 md:text-lg">
            Mantenha um histórico detalhado dos serviços e manutenções
            realizados no seu veículo.
          </p>
        </div>

        <div className="flex flex-col items-center p-4 bg-zinc-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <Bell className="text-green-700 mb-2" size={32} />
          <p className="text-center text-zinc-700 font-medium md:text-xl uppercase">
            Registro de Lembretes
          </p>
          <p className="text-center text-zinc-500 text-base mt-3 md:text-lg">
            Receba lembretes por e-mail para manutenções, pagamentos e outras
            atividades importantes.
          </p>
        </div>

        <div className="flex flex-col items-center p-4 bg-zinc-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <CreditCard className="text-green-700 mb-2" size={32} />
          <p className="text-center text-zinc-700 font-medium md:text-xl uppercase">
            Cadastro de Despesas
          </p>
          <p className="text-center text-zinc-500 text-base mt-3 md:text-lg">
            Controle todas as suas despesas relacionadas ao veículo em um único
            lugar.
          </p>
        </div>
      </div>

      <div className="flex flex-col pb-10 items-center justify-center w-full bg-gradient-radial from-green-100 to-white my-20">
        <img
          src={Smartmockup.src}
          alt="smartmockup tablet, celular e notebook"
          className="mb-5"
        />

        <button
          onClick={() => push("/cadastrar")}
          className="flex  items-center justify-center gap-2 bg-transparent border border-green-700 font-bold text-green-700 shadow-lg w-96 py-2 rounded-xl hover:bg-green-700 hover:text-white"
        >
          Comece a sua gestão sem custos <Smile />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-6 max-w-5xl mx-auto mb-20">
        <div className="flex flex-col items-center p-4 bg-zinc-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <TrendingUp className="text-green-700 mb-2" size={32} />
          <p className="text-center text-zinc-700 font-medium md:text-xl uppercase">
            Cadastro de Receitas
          </p>
          <p className="text-center text-zinc-500 text-base mt-3 md:text-lg">
            Registre suas receitas de forma ilimitada relacionadas ao veículo.
          </p>
        </div>
        <div className="flex flex-col items-center p-4 bg-zinc-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <FileText className="text-green-700 mb-2" size={32} />
          <p className="text-center text-zinc-700 font-medium md:text-xl uppercase">
            Relatórios
          </p>
          <p className="text-center text-zinc-500 text-base mt-3 md:text-lg ">
            Visualize re3latórios para analisar o desempenho e os custos do seu
            veículo sem dor de cabeça.
          </p>
        </div>
        <div className="flex flex-col items-center p-4 bg-zinc-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <History className="text-green-700 mb-2" size={32} />
          <p className="text-center text-zinc-700 font-medium md:text-xl uppercase">
            Extrato/Histórico dos Registros
          </p>
          <p className="text-center text-zinc-500 text-base mt-3 md:text-lg ">
            Acesse um histórico completo de todos os registros feitos na
            plataforma.
          </p>
        </div>
        <div className="flex flex-col items-center p-4 bg-zinc-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <User className="text-green-700 mb-2" size={32} />
          <p className="text-center text-zinc-700 font-medium md:text-xl uppercase">
            Perfil e Configurações Personalizadas
          </p>
          <p className="text-center text-zinc-500 text-base mt-3 md:text-lg">
            Personalize seu perfil com informações e preferências específicas.
            Assim como Configurações para seus cadastros.
          </p>
        </div>
      </div>
    </div>
  );
}
