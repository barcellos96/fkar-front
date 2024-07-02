interface HelpContentProps {
  handleClosePopover: any;
}

export default function HelpContent({ handleClosePopover }: HelpContentProps) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-10 z-40"
        onClick={handleClosePopover}
      ></div>
      <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-40">
        <div className="flex items-center flex-col p-4">
          <span className="text-xl font-bold mb-1">Obter suporte</span>
          <p className="text-center font-light mb-5">
            Envie sua duvida. Entre em contato por email.
          </p>
          <div className="flex flex-col items-center">
            <a
              href="mailto:fkar.contato@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Enviar Agora
            </a>
            <span className="font-light my-1">ou</span>
            <a
              href="mailto:fkar.contato@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-blue-600  px-4 rounded hover:opacity-75"
            >
              fkar.contato@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
