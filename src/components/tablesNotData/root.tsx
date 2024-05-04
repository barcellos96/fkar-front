import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function RootNotDataTable({ children }: Props) {
  return (
    <div className="flex flex-col items-center justify-between text-base uppercase font-bold bg-gray-50 w-full ">
      {children}
    </div>
  );
}
