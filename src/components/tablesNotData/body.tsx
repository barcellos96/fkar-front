import { Plus } from "lucide-react";
import IconConfig from "../../assets/config-add.png";
import { ElementType } from "react";

interface Props {
  title: string;
  actionButton: () => void;
  icon: ElementType;
}

export default function BodyNotDataTable({
  icon: Icon,
  actionButton,
  title,
}: Props) {
  return (
    <div className="flex flex-col items-center mt-7 text-center gap-2">
      <img src={IconConfig.src} alt="icon wallet" width={70} height={70} />
      <h2 className="font-bold uppercase">cadastre seu primeiro {title}!</h2>
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
