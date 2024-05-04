import { ReactNode } from "react";

interface ModalRootProps {
  children: ReactNode;
}

export default function ModalRoot({ children }: ModalRootProps) {
  return (
    <div className="flex flex-col gap-6 bg-zinc-50 rounded-lg px-2 py-3 w-[320px] lg:w-1/4">
      {children}
    </div>
  );
}
