import { ElementType, InputHTMLAttributes } from "react";

interface ModalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ElementType;
  errorMessage?: string; // Mensagem de erro opcional
}

export default function ModalInput({
  icon: Icon,
  errorMessage,
  ...rest
}: ModalInputProps) {
  return (
    <div className="flex flex-col gap-1 mb-2">
      <div className="flex flex-row border items-center px-2 py-2 rounded-lg">
        {Icon && <Icon width={20} height={20} />}
        <input
          className="bg-transparent outline-none ps-2 w-full"
          placeholder="Nome"
          {...rest}
        />
      </div>
      {errorMessage && ( // Verifica se há mensagem de erro e se a visibilidade é true
        <span className="text-red-500 text-sm ms-2">{errorMessage}</span>
      )}
    </div>
  );
}
