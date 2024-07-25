import MockupSmartphone from "./mockupSmartphone";
import Link from "next/link";

export default function Title() {
  return (
    <div>
      <section className="flex flex-col justify-center items-center lg:items-stretch lg:flex-row lgg:gap-60">
        <div className="flex flex-col max-w-[600px] text-start lg:max-w-[480px] px-5 ">
          <h1 className="text-zinc-800 text-start text-3xl font-bold mb-4 mt-10 md:text-5xl ">
            Plataforma para Gestão de Veículos
          </h1>
          <span className="text-start text-lg md:text-2xl font-extralight mb-10 md:mb-0">
            Gerencie seus veículos de qualquer lugar{" "}
            <strong className="font-semibold">gratuitamente</strong>,
            diretamente na palma da sua mão. Simplifique sua gestão com detalhes
            práticos! Experimente a conveniência de ter tudo sob controle com
            apenas alguns toques.
          </span>

          {/* call to action */}
          <Link
            href={"/cadastrar"}
            className="flex justify-center max-w-[400px] bg-gradient-to-bl to-green-600 from-gray-300 text-white hover:opacity-80 hover:shadow-lg shadow-md font-semibold text-xl slg:mt-4 rounded-2xl py-3 transition-all duration-500 ease-in-out"
          >
            Cadastrar Gratuitamente
          </Link>
        </div>

        <div className="md:relative left-10">
          <MockupSmartphone />
        </div>
      </section>
    </div>
  );
}
