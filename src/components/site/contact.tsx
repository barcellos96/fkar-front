import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <div id="contato" className=" bg-zinc-50 p-7 lg:p-20 w-full">
      <div className="flex flex-col lg:flex-row justify-around lg:px-32 w-full">
        <section className="lg:max-w-[300px] lg:mt-10 py-3 px-6 bg-white lg:bg-transparent shadow-md lg:shadow-none rounded-lg w-full">
          <h2 className="text-2xl font-semibold text-zinc-800">
            Alguma dúvida?
          </h2>
          <span className="text-base font-light">Entre em contato</span>

          <div className="flex items-center">
            <Mail className="w-4 h-4 text-green-700 mr-2" />
            <span className="text-base font-light">fkar.contato@gmail.com</span>
          </div>
        </section>
        <form className="bg-white shadow-md rounded-lg p-8 mt-8 lg:w-[700px]">
          <div className="mb-4">
            <label className="block text-zinc-700 font-bold mb-2">Nome:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg text-zinc-700 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Seu nome"
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700 font-bold mb-2">
              E-mail:
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg text-zinc-700 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Seu e-mail"
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700 font-bold mb-2">
              Assunto:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg text-zinc-700 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Assunto"
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700 font-bold mb-2">
              Conteúdo:
            </label>
            <textarea
              className="w-full px-3 py-2 min-h-36 border rounded-lg text-zinc-700 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Sua mensagem"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
