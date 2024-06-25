import { Modal } from "@/components/modals";
import formatNumberWithSpaces from "@/utils/formatCurrencyWhiteSpaces";
import {
  BadgeCheck,
  Banknote,
  CalendarCheck,
  Fuel,
  HandCoins,
  Map,
  MapPin,
  Text,
  TrendingDown,
} from "lucide-react";

interface UpdateExpenseVehicleProps {
  amount: string;
  date?: string;
  description?: string;
  expense_type?: { id: string; name: string };

  km: string;
  location?: string | null;
  method_payment?: string | null;
  status_payment?: boolean;
  observation?: string | null;
  vehicleId?: string;
}

interface DataProps {
  item: UpdateExpenseVehicleProps;
  handleClose: () => void;
}

export default function ExpenseVehicleSelf({ item, handleClose }: DataProps) {
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
      <div className="px-4 pt-5 pb-2 flex-grow ">
        <Modal.Title
          icon={TrendingDown}
          title={item?.description ?? ""}
          onClose={handleClose}
          borderColor="border-red-700"
        />
        <div className="pr-7 pt-4">
          <section className="flex items-center py-3 gap-2">
            <CalendarCheck width={20} height={20} />
            <section className="flex flex-col">
              <span className="font-semibold text-lg">Data:</span>
              <span className="text-lg font-light">
                {formatDateTime(item?.date ?? "")}
              </span>
            </section>
          </section>

          <section className="flex items-center gap-2 py-2 border-b pb-5">
            <Map width={20} height={20} />
            <section className="flex flex-col">
              <span className="font-semibold text-lg">Hodometro:</span>
              <span className="text-lg font-light">
                {formatNumberWithSpaces(item.km)}
              </span>
            </section>
          </section>

          <section className="flex items-start gap-2 pt-6 pb-6 border-b">
            <TrendingDown width={20} height={20} className="mt-1" />
            <section className="flex flex-col w-full">
              <span className="font-semibold text-lg mb-2">
                Tipo de despesa:
              </span>
              <span>{item?.expense_type?.name ?? ""}</span>
            </section>
          </section>

          <div className="flex items-center gap-6 pt-6 pb-4">
            <section className="flex items-center gap-2">
              <HandCoins width={20} height={20} />
              <section className="flex flex-col">
                <span className="font-semibold text-lg">
                  Metodo de pagamento:
                </span>
                <span className="text-lg font-light">
                  {item?.method_payment?.toUpperCase() ??
                    "Nenhum metodo adicionado"}
                </span>
              </section>
            </section>

            <section className="flex items-center gap-2">
              <BadgeCheck width={20} height={20} />
              <section className="flex flex-col">
                <span className="font-semibold text-lg">Status:</span>
                <span className="text-lg font-light">
                  {item?.status_payment ? "Pago" : "Não Pago"}
                </span>
              </section>
            </section>
          </div>

          <section className="flex items-center gap-2 pb-4">
            <MapPin width={20} height={20} />
            <section className="flex flex-col">
              <span className="font-semibold text-lg">Localização:</span>
              <span className="text-lg font-light">
                {item?.location ?? "Nenhum local adicionado"}
              </span>
            </section>
          </section>

          <section className="flex items-center gap-2">
            <Text width={20} height={20} />
            <section className="flex flex-col">
              <span className="font-semibold text-lg">Observação:</span>
              <span className="text-lg font-light">
                {item?.observation ?? "Nenhuma observação"}
              </span>
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
            R$ {formatNumberWithSpaces(item.amount ?? "")}
          </span>
        </section>
      </div>
    </Modal.Root>
  );
}
