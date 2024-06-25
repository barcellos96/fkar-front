import {
  Banknote,
  BookType,
  CalendarCheck,
  Map,
  Text,
  TrendingUp,
} from "lucide-react";
import { Modal } from "../modals";
import { formatKm } from "@/hooks/km";

interface IncomingProps {
  title: string;
  date: string;
  km: number;
  incoming_type: { id: string; name: string };
  observation: string;
  amount_received: string;
}

interface DataProps {
  item: IncomingProps;
  handleClose: () => void;
}

export default function IncomingSelf({ item, handleClose }: DataProps) {
  function formatDateTime(dateString: string) {
    // Crie um objeto Date a partir da string fornecida
    const date = new Date(dateString);

    // Extrair componentes da data e hora
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Janeiro é 0!
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Formatar no formato desejado
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  return (
    <Modal.Root
      onClose={handleClose}
      justify="justify-end"
      items=""
      rounded=""
      width="w-full slg:max-w-[430px]"
      maxheigth="h-full"
      px=""
      py=""
    >
      <div className="px-4 py-5 flex-grow ">
        <Modal.Title
          icon={TrendingUp}
          title={item?.title ?? ""}
          onClose={handleClose}
        />
        <div className="pr-7">
          <div className="flex flex-col xlg:flex-row gap-10 xlg:justify-between justify-start border-b py-12">
            <section className="flex items-center gap-2">
              <CalendarCheck width={26} height={26} />
              <section className="flex flex-col">
                <span className="font-semibold text-lg">Data:</span>
                <span className="text-lg font-light">
                  {formatDateTime(item?.date ? item?.date : "")}
                </span>
              </section>
            </section>

            <section className="flex items-center gap-2">
              <Map width={26} height={26} />
              <section className="flex flex-col">
                <span className="font-semibold text-lg">Hodometro(km):</span>
                <span className="text-lg font-light">{formatKm(item.km)}</span>
              </section>
            </section>
          </div>

          <section className="flex xlg:flex-row gap-2 justify-start items-center border-b py-8">
            <BookType width={26} height={26} />
            <section className="flex flex-col">
              <span className="font-semibold text-lg">Tipo de Receita:</span>
              <span className="text-lg font-light">
                {item?.incoming_type.name}
              </span>
            </section>
          </section>

          <section className="flex items-center gap-2 py-6">
            <Text width={26} height={26} />
            <section className="flex flex-col">
              <span className="font-semibold text-lg">Observação:</span>
              <span className="text-lg font-light">{item?.observation}</span>
            </section>
          </section>
        </div>
      </div>

      {/* final */}
      <div className=" bg-green-700 gap-4 flex items-center w-full py-4 px-3  rounded-t-lg ">
        <Banknote width={40} height={40} className="text-white" />
        <section className="flex flex-col">
          <span className="font-light text-md text-white">Total</span>
          <span className="text-xl font-bold text-white">
            R$ {item?.amount_received}
          </span>
        </section>
      </div>
    </Modal.Root>
  );
}
