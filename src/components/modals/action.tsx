import { InputHTMLAttributes } from "react";
import Loading from "../loading";
import { Check } from "lucide-react";

interface ModalActionsProps extends InputHTMLAttributes<HTMLInputElement> {
  onSubmitAction?: () => void;
  nameButtonSubmit?: string;
  bgColorSubmit?: string;
  loading?: boolean;
  onCancelAction?: () => void;
  typeButton?: "submit" | "reset" | "button"; // Match the allowed button types
}

export default function ModalActions({
  onSubmitAction,
  nameButtonSubmit = "cadastrar",
  bgColorSubmit = "bg-green-700",
  loading,
  typeButton = "submit", // Default to "submit"
  onCancelAction,
}: ModalActionsProps) {
  return (
    <div className="flex flex-row justify-start items-center text-center font-light gap-5 mb-2">
      {onSubmitAction && (
        <div
          className={`${bgColorSubmit} flex flex-row gap-2 items-center rounded-lg px-2 py-2 hover:bg-opacity-80 `}
        >
          <Check width={14} height={14} className="text-white" />

          <button
            type={typeButton}
            onClick={onSubmitAction}
            disabled={loading}
            className={`uppercase text-white text-base`}
          >
            {loading ? <Loading color="white" /> : nameButtonSubmit}
          </button>
        </div>
      )}

      {onCancelAction && (
        <button
          type={typeButton}
          className="uppercase text-zinc-400 text-base hover:opacity-70"
          onClick={onCancelAction}
        >
          Cancelar
        </button>
      )}
    </div>
  );
}
