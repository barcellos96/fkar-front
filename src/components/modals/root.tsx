import { ReactNode } from "react";

interface ModalRootProps {
  children: ReactNode;
  onClose?: () => void;
}

export default function ModalRoot({ children, onClose }: ModalRootProps) {
  function handleClickOutside(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const target = event.target as HTMLElement;
    if (!target.closest(".modal-content")) {
      onClose && onClose();
    }
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-10 "
      onClick={handleClickOutside}
    >
      <div className="flex flex-col gap-6 bg-zinc-50 rounded-lg px-4 py-5 w-[320px] max-h-[540px] overflow-aut  overflow-auto lg:w-1/3 modal-content custom-scrollbar">
        {children}
      </div>
    </div>
  );
}
