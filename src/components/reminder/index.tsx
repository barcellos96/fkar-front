import { AlarmClock } from "lucide-react";
import HeaderComposition from "../header/headerComposition";

export default function ReminderPageLayout() {
  return (
    <div className="w-full h-full rounded-lg bg-white gap-4 px-6 py-5 mt-3 shadow-lg">
      <HeaderComposition
        nameButton="Novo Lembrete"
        typeSubmit="button"
        title="Lembretes"
        icon={AlarmClock}
      />
    </div>
  );
}
