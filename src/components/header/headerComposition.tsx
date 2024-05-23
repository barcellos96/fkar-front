import { ElementType } from "react";

interface Props {
  handleSubmit?: () => void;
  typeSubmit?: "submit" | "reset" | "button";
  title?: string;
  buttonVisible?: boolean;
  nameButton?: string | JSX.Element;
  icon?: ElementType;
}

export default function HeaderComposition({
  handleSubmit,
  title,
  nameButton,
  typeSubmit,
  icon: Icon,
  buttonVisible = true,
}: Props) {
  return (
    <section className="flex items-center justify-between mb-5">
      {Icon ? (
        <div className="flex gap-3">
          <Icon width={25} height={25} />
          <span className="border-l-2 border-green-700 px-2 text-lg uppercase">
            {title}
          </span>
        </div>
      ) : (
        <h1 className="font-semibold text-xl ">{title}</h1>
      )}

      {nameButton && (
        <button
          title={`Cadastrar ${nameButton}`}
          type={typeSubmit}
          onClick={handleSubmit}
          className={`${
            buttonVisible ? "block" : "hidden"
          } bg-green-700 hover:bg-opacity-80 text-white cursor-pointer px-3 py-2 rounded focus:outline-none text-base`}
        >
          <span className="hidden sm:block">{nameButton}</span>
          {nameButton === "Salvar" ? (
            <span className="sm:hidden">{nameButton}</span>
          ) : (
            <span className="sm:hidden">+</span>
          )}
        </button>
      )}
    </section>
  );
}
