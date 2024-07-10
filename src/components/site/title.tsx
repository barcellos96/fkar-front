import MockupSmartphone from "./mockupSmartphone";

export default function Title() {
  return (
    <div>
      <section className="flex flex-col justify-center items-center lg:items-stretch lg:flex-row lgg:gap-60">
        <div className="max-w-[600px] text-start lg:max-w-[480px] px-5 ">
          <h1 className="text-zinc-800 text-start text-3xl font-bold mb-4 mt-10 md:text-5xl ">
            Plataforma de Gestão de Veículos
          </h1>
          <span className="text-start text-lg md:text-2xl font-extralight mb-10 md:mb-0">
            Gerencie seus veículos de qualquer lugar, diretamente na palma da
            sua mão. Simplifique sua gestão com detalhes práticos! Experimente a
            conveniência de ter tudo sob controle com apenas alguns toques.
          </span>
        </div>

        <div className="md:relative left-10">
          <MockupSmartphone />
        </div>
      </section>
    </div>
  );
}
