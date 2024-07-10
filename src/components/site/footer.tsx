import { Instagram } from "lucide-react";
import Logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-zinc-700 text-white pt-8 pb-20 slg:px-32 ">
      <div className="container mx-auto flex flex-row justify-between  space-y-4">
        <div className="flex flex-col items-start">
          <img
            src={Logo.src}
            alt="Logo"
            className="flex items-start -ml-10 h-24 -mb-2"
          />
          <span>Todos direitos reservados | Fkar Gestão de Veiculos</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col">
          <section className="flex flex-col gap-2">
            <a href="#" className="hover:underline">
              Home
            </a>
            <a href="#services" className="hover:underline">
              Serviços
            </a>
            <a href="#plans" className="hover:underline">
              Planos
            </a>
            <a href="#contact" className="hover:underline">
              Contato
            </a>
          </section>

          <div className="flex mt-5">
            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-6 h-6 text-white hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
