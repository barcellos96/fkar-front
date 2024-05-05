import { ElementType } from "react";

interface Props {
  handleSubmit?: () => void;
  typeSubmit: "submit" | "reset" | "button";
  title?: string;
  nameButton: string | JSX.Element;
  icon?: ElementType;
}

export default function HeaderComposition({
  handleSubmit,
  title,
  nameButton,
  typeSubmit,
  icon: Icon,
}: Props) {
  return (
    <section className="flex items-center justify-between mb-5">
      {Icon ? (
        <div className="flex gap-3">
          <Icon width={25} height={25} />
          <span className="border-l border-green-700 px-2 text-xl">
            {title}
          </span>
        </div>
      ) : (
        <h1 className="font-semibold text-xl ">{title}</h1>
      )}

      <button
        type={typeSubmit}
        onClick={handleSubmit}
        className="bg-green-700 hover:bg-opacity-80 text-white cursor-pointer px-3 py-2 rounded focus:outline-none text-base"
      >
        <span className="hidden sm:block">{nameButton}</span>
        <span className="sm:hidden">+</span>
      </button>
    </section>
  );
}
