import { ElementType, InputHTMLAttributes } from "react";

interface ModalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ElementType;
}

export default function ModalInput({ icon: Icon, ...rest }: ModalInputProps) {
  return (
    <div className="flex flex-row border items-center px-2 py-1 rounded-md">
      <Icon width={20} height={20} />
      <input
        className="bg-transparent outline-none px-2 w-full"
        placeholder="Nome"
        {...rest}
      />
    </div>
  );
}
