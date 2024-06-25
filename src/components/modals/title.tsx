import { X } from "lucide-react";
import { ElementType, InputHTMLAttributes } from "react";

interface ModalTitleProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ElementType;
  sizeIcon?: number;
  title: string;
  onClose?: () => void;
  borderColor?: string;
}

export default function ModalTitle({
  icon: Icon,
  sizeIcon = 30,
  title,
  onClose,
  borderColor = "border-green-700",
}: ModalTitleProps) {
  return (
    <div className="flex flex-col text-lg font-semibold">
      <div className="flex flex-row justify-between items-center mb-3">
        <section className="flex gap-3 items-center">
          {Icon && <Icon width={sizeIcon} height={sizeIcon} />}
          <div className={`border-l-2 ${borderColor} px-2`}>{title}</div>
        </section>

        {onClose && (
          <button onClick={onClose}>
            <X width={20} height={20} />
          </button>
        )}
      </div>

      <div className="border w-full border-zinc-200" />
    </div>
  );
}
