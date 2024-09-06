import { formatKm } from "@/hooks/km";
import Filters from "../filters";

interface Props {
  km: number;
}

export default function HeaderTimeline({ km }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <section className="flex flex-col mx-5">
        <h2 className="flex items-center justify-center text-base lg:text-lg font-bold mb-1">
          ULTIMOS REGISTROS
        </h2>
        <span className="flex flex-row gap-1 text-sm lg:text-base items-center justify-center">
          <span className="font-extralight">Quilometragem:</span>
          <span className="font-medium">{formatKm(km)}</span>
        </span>
      </section>

      <Filters />
    </div>
  );
}
