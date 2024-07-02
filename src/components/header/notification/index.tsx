import { BellOff } from "lucide-react";

interface NotificationContentProps {
  handleClosePopover: any;
}

export default function NotificationContent({
  handleClosePopover,
}: NotificationContentProps) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-10 z-40"
        onClick={handleClosePopover}
      ></div>
      <div className="absolute top-8 right-0 w-64 bg-white border rounded-lg shadow-lg z-50">
        <div className="flex px-4">
          <span className="flex text-base font-bold px-1 py-2 border-b-2 border-zinc-200 w-full">
            Notificações
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center bg-green-700 w-32 h-32 rounded-full mt-8 mb-4 ">
            <BellOff size={40} color="white" />
          </div>
          <div className="text-center font-extralight p-4">
            Nenhuma Notificação para mostrar no momento
          </div>
        </div>
      </div>
    </>
  );
}
