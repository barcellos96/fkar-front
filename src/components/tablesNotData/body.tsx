import { StaticImageData } from "next/image";
import { ElementType } from "react";

interface Props {
  title: string;
  actionButton?: () => void;
  icon: ElementType;
  img: StaticImageData;
}

export default function BodyNotDataTable({
  icon: Icon,
  actionButton,
  title,
  img,
}: Props) {
  return (
    <div className="flex flex-col items-center mt-7 mb-5 text-center gap-2">
      <img src={img.src} alt="icon wallet" width={70} height={70} />
      <h2 className="font-bold uppercase">
        cadastre sua/seu primeiro(a) {title}!
      </h2>
      <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-3 font-extralight">
        <span>Clique aqui </span>
        <button onClick={actionButton}>
          <Icon className="bg-green-700 text-white rounded-full hover:bg-opacity-80" />
        </button>
        <span>para cadastrar</span>
      </div>
    </div>
  );
}
