import { AlarmClock, Clock } from "lucide-react";

export default function TitleReminder() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3">
        <AlarmClock width={30} height={30} />
        <span className="border-l-2 border-green-700 px-2 text-xl">
          Lembretes
        </span>
      </div>
    </div>
  );
}
