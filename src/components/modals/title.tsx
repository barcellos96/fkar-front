import { X } from "lucide-react";

interface ModalTitleProps {
  title: string;
  onClose: () => void;
}

export default function ModalTitle({ title, onClose }: ModalTitleProps) {
  return (
    <div className="flex flex-col text-lg font-semibold">
      <div className="flex flex-row justify-between items-center mb-3">
        <div>{title}</div>
        <div>
          <button onClick={onClose}>
            <X width={14} height={14} />
          </button>
        </div>
      </div>

      <div className="border w-full border-zinc-200" />
    </div>
  );
}
