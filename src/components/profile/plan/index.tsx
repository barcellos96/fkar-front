"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface CardProps {
  title: string;
  price: string;
  features: string[];
  enabled: boolean;
  nameButton?: boolean;
}

interface Props {
  onDash?: boolean;
}

export default function Subscription({ onDash }: Props) {
  return (
    <div id="planos" className="  flex items-center justify-center rounded-lg">
      <div className="mx-auto p-6">
        <h1 className="text-2xl lgg:text-4xl font-bold mb-8 text-center text-zinc-800">
          Planos de Assinatura
        </h1>
        <div className="grid grid-cols-1 slg:grid-cols-3 gap-6">
          <PlanCard
            title="Gratuito"
            price="R$0/mês"
            features={[
              "-> Registro de Abastecimento ilimitados",
              "-> Registro de Despesas Ilimitados",
              "-> Registro de Manutenções ilimitados",
              "-> Registro de Receitas ilimitadas",
              "-> Até 2 Veiculos ativos",
              "-> Lembretes ilimitados",
              "-> Relatórios",
              "-> Acesso ilimitado Web, IOS e Android",
            ]}
            enabled={true}
            nameButton={onDash}
          />
          <PlanCard
            title="Ouro"
            price="R$14,90/mês"
            features={[
              "-> Tudo do plano GRATUITO",
              "-> Adicionar arquivos",
              "-> Até 10 Veículos ativos",
              "-> Cadastro de até 2 motoristas",
              "-> Vincular motorista a registros de despesa, receita, manutenção ou abastecimento",
              "-> Sem anuncios",
            ]}
            enabled={false}
            nameButton={onDash}
          />
          <PlanCard
            title="Diamante"
            price="R$29,90/mês"
            features={[
              "-> Tudo do plano OURO",
              "-> Veículos ilimitados",
              "-> Motoristas ilitmitados",
            ]}
            nameButton={onDash}
            enabled={false}
          />
        </div>
      </div>
    </div>
  );
}

function PlanCard({ title, price, features, enabled, nameButton }: CardProps) {
  const { push } = useRouter();

  return (
    <div
      className={`max-w-[350px] border rounded-lg p-6 ${
        enabled ? "bg-white" : "bg-gray-200"
      } shadow-md`}
    >
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-xl mb-4">{price}</p>
      <ul className="mb-6">
        {features.map((feature, index) => (
          <li key={index} className="mb-2">
            {feature}
          </li>
        ))}
      </ul>
      {enabled ? (
        <button
          onClick={() => !nameButton && push("/cadastrar")}
          className="block w-full text-center bg-green-700 text-white py-2 rounded hover:bg-green-600 transition duration-300"
        >
          {!nameButton ? "Testar Gratuitamente :)" : "Ativo"}
        </button>
      ) : (
        <button
          disabled
          className="block w-full text-center bg-gray-400 text-white py-2 rounded cursor-not-allowed"
        >
          Em Breve
        </button>
      )}
    </div>
  );
}
