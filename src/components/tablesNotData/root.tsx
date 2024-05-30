import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function RootNotDataTable({ children }: Props) {
  return (
    <div className="flex flex-col items-center justify-between text-base uppercase font-bold bg-white mt-4 rounded-xl  py-2 px-3 w-full ">
      {children}
    </div>
  );
}
