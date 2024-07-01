import Link from "next/link";

interface CardProps {
  title: string;
  price: string;
  features: string[];
  enabled: boolean;
}

export default function Subscription() {
  return (
    <div className=" bg-gray-100 flex items-center justify-center rounded-lg">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Planos de Assinatura
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
          />
          <PlanCard
            title="Ouro"
            price="R$29,90/mês"
            features={[
              "-> Tudo do plano GRATUITO",
              "-> Adicionar arquivos",
              "-> Até 10 Veículos ativos",
              "-> Cadastro de até 2 motoristas",
              "-> Vincular motorista a registros de despesa, receita, manutenção ou abastecimento",
              "-> Sem anuncios",
            ]}
            enabled={false}
          />
          <PlanCard
            title="Diamante"
            price="R$49,90/mês"
            features={[
              "-> Tudo do plano OURO",
              "-> Veículos ilimitados",
              "-> Motoristas ilitmitados",
            ]}
            enabled={false}
          />
        </div>
      </div>
    </div>
  );
}

function PlanCard({ title, price, features, enabled }: CardProps) {
  return (
    <div
      className={`border rounded-lg p-6 ${
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
        <button className="block w-full text-center bg-green-700 text-white py-2 rounded hover:bg-green-600 transition duration-300">
          Ativo
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
