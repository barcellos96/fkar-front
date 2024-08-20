import { ReactNode } from "react";

interface ModalRootProps {
  children: ReactNode;
  onClose?: () => void;
  justify?: string;
  items?: string;
  width?: string;
  maxheigth?: string;
  rounded?: string;
  px?: string;
  py?: string;
}

export default function ModalRoot({
  children,
  onClose,
  justify = "justify-center",
  items = "items-center",
  width = "min-w-[320px]",
  maxheigth = "max-h-[600px]",
  rounded = "rounded-lg",
  px = "px-4",
  py = "py-5",
}: ModalRootProps) {
  function handleClickOutside(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const target = event.target as HTMLElement;
    if (!target.closest(".modal-content")) {
      onClose && onClose();
    }
  }

  //  className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-10 "

  return (
    <div
      className={`z-50 fixed top-0 left-0 w-full h-full flex ${justify} ${items} bg-black bg-opacity-40 xlg:px-72`}
      onClick={handleClickOutside}
    >
      <div
        className={`flex flex-col gap-6 bg-zinc-50 ${rounded} ${px} ${py} ${width} mx-2 ${maxheigth} overflow-auto modal-content custom-scrollbar`}
      >
        {children}
      </div>
    </div>
  );
}
