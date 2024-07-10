"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MoveLeft, MoveRight } from "lucide-react";

const questionsAnswers = [
  {
    question: "O que a FKAR oferece?",
    answer:
      "A FKAR é uma plataforma digital que oferece a você todo serviço para gestão do seu veículo. Desde os registros de custos a lembretes para futuras manutenções.",
  },
  {
    question: "Como posso usar?",
    answer:
      "Você pode se cadastrar clicando no botão de inscrição no topo da nossa página e preenchendo o registro.",
  },
  {
    question: "Qual é o custo?",
    answer:
      "O custo é gratuito! Temos planos pagos, porem você apenas irá pagar caso desejar e se nao gostar poderá cancelar a qualquer momento. Consulte nossos planos e preços para mais detalhes.",
  },
  {
    question: "Como posso cancelar minha inscrição?",
    answer:
      "Você pode cancelar sua inscrição a qualquer momento acessando as configurações da sua conta..",
  },
  {
    question: "Como posso entrar em contato com suporte",
    answer:
      "O suporte é feito por email. Pode entrar em contato através do fkar.contato@gmail.com. Caso ja tenha uma conta, basta informar seu email e nome de usuário.",
  },
  {
    question: "Preciso instalar alguma aplicativo ou é online?",
    answer:
      "Não, você não precisa instalar nenhum sistema. Nossa plataforma é 100% online e você pode acessar pelo navegador de qualquer computador ou celular. Temos um aplicativo para celular que você pode instalar caso queira utilizar a plataforma no seu telefone e ter o controle de tudo de onde estiver. Porem caso nao tiver interesse em baixar nosso aplcativo a plataforma é totalmente responsiva.  :)",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      id="duvidas"
      className="bg-white flex flex-col items-center justify-center py-10"
    >
      <span className="flex items-center gap-3 text-lg font-light text-zinc-600 mb-5">
        <MoveRight className="text-green-700" /> Perguntas Frequentes
        <MoveLeft className="text-green-700" />
      </span>
      <div className="w-3/4">
        {questionsAnswers.map((item, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => handleToggle(index)}
              className="flex flex-row justify-between items-center w-full text-left text-md font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              {item.question}

              {activeIndex === index ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {activeIndex === index && (
              <div className="text-zinc-600 text-lg font-extralight px-4 py-2 bg-gray-50 border-l-2 border-zinc-300">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
