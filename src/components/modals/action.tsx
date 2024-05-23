import { InputHTMLAttributes } from "react";
import Loading from "../loading";
import { Check } from "lucide-react";

interface ModalActionsProps extends InputHTMLAttributes<HTMLInputElement> {
  onSubmitAction?: () => void;
  nameButtonSubmit?: string;
  bgColorSubmit?: string;
  loading?: boolean;
  onCancelAction?: () => void;
}

export default function ModalActions({
  onSubmitAction,
  nameButtonSubmit = "cadastrar",
  bgColorSubmit = "bg-green-700",
  loading,
  onCancelAction,
}: ModalActionsProps) {
  return (
    <div className="flex flex-row justify-start items-center text-center font-light gap-5 mb-2">
      <div
        className={`${bgColorSubmit} flex flex-row gap-2 items-center rounded-lg px-2 py-1 `}
      >
        <Check width={14} height={14} className="text-white" />
        <button
          onClick={onSubmitAction}
          disabled={loading}
          className={`uppercase ${bgColorSubmit} text-white text-base`}
        >
          {loading ? <Loading color="white" /> : nameButtonSubmit}
        </button>
      </div>

      <button
        className="uppercase text-zinc-400 text-base"
        onClick={onCancelAction}
      >
        Cancel
      </button>
    </div>
  );
}
