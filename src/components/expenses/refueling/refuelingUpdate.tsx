import { Modal } from "@/components/modals";
import { ExpenseTypeContext } from "@/providers/expense/expenseType";
import { ExpenseVehicleContext } from "@/providers/expense/expenseVehicle";
import { FuelContext } from "@/providers/fuel";
import { VehicleContext } from "@/providers/vehicle/vehicle";
import { zodResolver } from "@hookform/resolvers/zod";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Loading from "../../loading";
import { addHours, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Locale } from "date-fns";

interface UpdateExpenseVehicleProps {
  amount: string;
  date?: string;
  description?: string;
  expense_type_id?: { id: string; name: string };
  fuel_type?: string | null;
  fuel_liters?: string | null;
  price_liters?: string | null;
  km: string;
  location?: string | null;
  method_payment?: string | null;
  status_payment?: boolean;
  observation?: string | null;
  vehicleId?: string;
}

interface DataProps {
  expenseVehicleId: string;
  item: UpdateExpenseVehicleProps;
  handleClose: () => void;
}

export default function RefuelingUpdate({
  expenseVehicleId,
  item,
  handleClose,
}: DataProps) {
  const [loading, setLoading] = useState(false);
  const [sectionPlus, setSectionPlus] = useState(false);

  const { GetFuelType, fuelType } = useContext(FuelContext);
  const { selectedVehicleId } = useContext(VehicleContext);
  const { GetExpenseType, expenseType } = useContext(ExpenseTypeContext);
  const { UpdateExpenseVehicle, expenseVehicle, GetExpenseVehicle } =
    useContext(ExpenseVehicleContext);

  useEffect(() => {
    if (fuelType === null || expenseType === null || expenseVehicle === null) {
      Promise.all([GetFuelType(), GetExpenseType(), GetExpenseVehicle()]);
    }
  }, []);

  const expenseTypeId = expenseType?.find(
    (item) => item.name.toLowerCase() === "abastecimento"
  );

  const date = new Date(item?.date ?? "");
  const time = new Date(item?.date ?? "");

  // Formatar a data no estilo yyyy-MM-dd
  const formattedDate = date
    .toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-")
    .split("-")
    .reverse()
    .join("-");

  // Formatar o tempo no estilo hh:mm
  const formattedTime = time.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // Função para formatar o número com pontos como separadores de milhares
  const formatNumber = (value: string) => {
    // Remove qualquer coisa que não seja número
    value = value.toString().replace(/\D/g, "");
    // Adiciona pontos como separadores de milhares
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return value;
  };

  const defaultValues = {
    date: formattedDate,
    time: formattedTime,
    description: item?.description ?? "",
    location: item?.location ?? "",
    expense_type_id: expenseTypeId?.id ?? "",
    km: formatNumber(item?.km ?? "") ?? "",
    fuel_type: item?.fuel_type ?? "",
    fuel_liters: item?.fuel_liters ?? "",
    price_liters: item?.price_liters ?? "",
    amount: item?.amount ?? "",
    method_payment: item?.method_payment ?? "",
    observation: item?.observation ?? "",
    vehicleId: item?.vehicleId ?? selectedVehicleId,
  };

  const schema = z.object({
    date: z.string().min(1, "data obrigatória"),
    time: z.string().min(1, "hora obrigatória"),
    description: z.string().min(1, "descrição do gasto obrigatório"),
    location: z.string(),
    expense_type_id: z.string().min(1, "Obrigatorio id do tipo de despesa"),
    km: z.string().min(1, "quilometragem atual obrigatória"),
    fuel_type: z.string().min(1, "tipo de combustivel obrigatório"),
    fuel_liters: z.string(),
    price_liters: z.string().min(1, "preço do combustível obrigatório"),
    amount: z.string().min(1, "total gasto obrigatório"),
    method_payment: z.string().nullable(),
    observation: z.string(),
    vehicleId: z.string(),
  });

  type RegisterProps = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterProps>({
    values: defaultValues,
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    // Definir fuel_type como valor padrão se estiver disponível
    if (item?.fuel_type) {
      setValue("fuel_type", item.fuel_type);
    }
  }, [item, setValue]);

  const amount = watch("amount").replace(/[^0-9.-]+/g, ""); // Remove tudo que não é número, ponto ou hífen
  const priceLiters = watch("price_liters").replace(/[^0-9.-]+/g, ""); // Aplica a mesma remoção para price_liters

  const fuelLitersValue = `${
    watch("amount") === "" ? 0 : Number(amount) / Number(priceLiters)
  }`;

  let roundedFuelLitersValue = Number(fuelLitersValue).toFixed(2);

  if (roundedFuelLitersValue.endsWith(".00")) {
    roundedFuelLitersValue = Number(roundedFuelLitersValue).toFixed(0);
  }

  if (
    !roundedFuelLitersValue ||
    roundedFuelLitersValue === "NaN" ||
    roundedFuelLitersValue === "infinity"
  ) {
    roundedFuelLitersValue = "";
  }

  roundedFuelLitersValue = roundedFuelLitersValue.toString(); // Certifique-se de que seja uma string

  const onSubmit: SubmitHandler<RegisterProps> = async (value) => {
    const dateTimeString = `${value.date}T${value.time}`;
    const dateTime = new Date(dateTimeString);

    const adjustedDateTime = addHours(dateTime, 3); // Adjusting the time to UTC

    const dateFormated = format(adjustedDateTime, "yyyy-MM-dd HH:mm:ss", {
      locale: ptBR as Locale,
    });

    const { time, ...rest } = value;

    const formattedValue = { ...rest, date: dateFormated };

    if (formattedValue.method_payment === "") {
      formattedValue.method_payment = null;
    }

    const formattedValueWithNumbers = {
      ...formattedValue,
      km: Number(formattedValue.km.split(".").join("")),
      amount: Number(amount),
      price_liters: priceLiters,
      fuel_liters: roundedFuelLitersValue, // Certifique-se de que seja uma string
    };

    setLoading(true);
    try {
      await UpdateExpenseVehicle(
        expenseVehicleId,
        formattedValueWithNumbers
      ).finally(() => {
        setLoading(false);
        handleClose();
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSectionPlus = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSectionPlus(!sectionPlus);
  };

  return (
    <Modal.Root onClose={handleClose}>
      <Modal.Title
        title="Atualizar Abastecimento"
        borderColor="border-yellow-600"
        onClose={handleClose}
      />

      {/* formulario */}
      <form
        action="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-[500px] "
      >
        {/* descrição */}
        <div className="flex flex-col  mb-5">
          <label
            htmlFor="description"
            className="text-base font-semibold mb-2 ml-1 "
          >
            Descrição:*
          </label>
          <input
            type="text"
            id="description"
            className=" h-12 border rounded-lg py-2 px-3 leading-tight focus:outline-none"
            placeholder="Descrição"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-sm ml-2 mt-1.5 text-red-300">
              {errors.description.message}
            </span>
          )}{" "}
        </div>

        {/* data e hora */}
        <div className="flex flex-row gap-2 ">
          <div className="flex flex-col mb-5">
            <label
              htmlFor="date"
              className="text-base font-semibold mb-2 ml-1 "
            >
              Data:*
            </label>
            <input
              type="date"
              id="date"
              className=" h-12 border rounded-lg py-2 px-3 leading-tight focus:outline-none"
              placeholder="Data e Hora"
              {...register("date")}
            />
            {errors.date && (
              <span className="text-sm ml-2 mt-1.5 text-red-300">
                {errors.date.message}
              </span>
            )}
          </div>
          <div className="flex flex-col  mb-5">
            <label
              htmlFor="time"
              className="text-base font-semibold mb-2 ml-1 "
            >
              Hora:*
            </label>
            <input
              type="time"
              id="time"
              className=" h-12 border rounded-lg py-2 px-3 leading-tight focus:outline-none"
              placeholder="Descrição"
              {...register("time")}
            />
            {errors.time && (
              <span className="text-sm ml-2 mt-1.5 text-red-300">
                {errors.time.message}
              </span>
            )}
          </div>
        </div>

        {/* km */}
        <div className="flex flex-col mb-5">
          <label htmlFor="km" className="text-base font-semibold mb-2 ml-1 ">
            Hodometro no abastecimento:*
          </label>
          <input
            type="text"
            id="km"
            className=" h-12 border rounded-lg py-2 px-3 leading-tight focus:outline-none"
            placeholder="Hodometro (km)"
            {...register("km")}
            onChange={(e) => {
              const inputValue = e.target.value;
              setValue("km", formatNumber(inputValue));
            }}
          />
          {errors.km && (
            <span className="text-sm ml-2 mt-1.5 text-red-300">
              {errors.km.message}
            </span>
          )}{" "}
        </div>

        {/* tipo de combustível */}
        <div className="flex flex-col mb-5">
          <label
            htmlFor="fuel_type"
            className="text-base font-semibold mb-2 ml-1"
          >
            Tipo de Combustível:*
          </label>
          <select
            id="fuel_type"
            className="h-12 border rounded-lg py-2 px-3 leading-tight focus:outline-none"
            {...register("fuel_type")}
            defaultValue={item?.fuel_type ?? ""}
          >
            {fuelType?.map((item, index) => (
              <option key={index} value={item.fuel_name}>
                {item.fuel_name}
              </option>
            ))}
          </select>
          {errors.fuel_type && (
            <span className="text-sm ml-2 mt-1.5 text-red-300">
              {errors.fuel_type.message}
            </span>
          )}
        </div>

        {/* preço e total */}
        <div className="flex flex-row max-w-[300px] slg:max-w-[500px]  slg:flex-row gap-2">
          <div className="flex flex-col w-1/2 mb-5 gap-5">
            <label
              htmlFor="price_liters"
              className="flex flex-wrap text-base font-semibold mb-2 ml-1 "
            >
              Preço Combustível:*
            </label>
            <input
              type="text"
              id="price_liters"
              className=" h-12 border rounded-lg py-2 px-3 leading-tight focus:outline-none"
              placeholder="Preço / L"
              {...register("price_liters")}
              onChange={(e) => {
                let inputValue = e.target.value;
                // Remover caracteres não numéricos, exceto vírgula e ponto
                inputValue = inputValue.replace(/[^0-9,.]/g, "");
                // Substituir vírgulas por pontos
                inputValue = inputValue.replace(",", ".");
                // Remover múltiplos pontos consecutivos
                inputValue = inputValue.replace(/(\..*)\./g, "$1");
                // Formatando com espaço a cada milhar
                inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                setValue("price_liters", `R$ ${inputValue}`);
              }}
            />
            {errors.price_liters && (
              <span className="text-sm ml-2 mt-1.5 text-red-300">
                {errors.price_liters.message}
              </span>
            )}{" "}
          </div>
          {/* total */}
          <div className="flex flex-col w-1/2 mb-5 slg:gap-5">
            <label
              htmlFor="amount"
              className="text-base font-semibold mb-2 ml-1 "
            >
              Valor Abastecimento:*
            </label>
            <input
              type="text"
              id="amount"
              className=" h-12 border rounded-lg py-2 px-3 leading-tight focus:outline-none"
              placeholder="R$ Total"
              {...register("amount")}
              onChange={(e) => {
                let inputValue = e.target.value;
                // Remover caracteres não numéricos, exceto vírgula e ponto
                inputValue = inputValue.replace(/[^0-9,.]/g, "");
                // Substituir vírgulas por pontos
                inputValue = inputValue.replace(",", ".");
                // Remover múltiplos pontos consecutivos
                inputValue = inputValue.replace(/(\..*)\./g, "$1");

                // Limitar a apenas dois dígitos após o ponto
                inputValue = inputValue.replace(/(\.\d{2})\d+/g, "$1");

                // Formatando com espaço a cada milhar
                inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                setValue("amount", `R$ ${inputValue}`);
              }}
            />
            {errors.amount && (
              <span className="text-sm ml-2 mt-1.5 text-red-300">
                {errors.amount.message}
              </span>
            )}{" "}
          </div>
        </div>

        {/* litros combustivel */}
        <div className="flex flex-col w-1/2 mb-5">
          <label
            htmlFor="fuel_liters"
            className="flex flex-wrap text-base font-semibold mb-2 ml-1 "
          >
            Litros Combustível:*
          </label>
          <input
            type="text"
            id="fuel_liters"
            className=" h-12 border rounded-lg py-2 px-3 leading-tight focus:outline-none cursor-not-allowed bg-zinc-100"
            placeholder="Qtd Litros"
            disabled
            value={roundedFuelLitersValue}
            {...register("fuel_liters")}
          />
          {errors.fuel_liters && (
            <span className="text-sm ml-2 mt-1.5 text-red-300">
              {errors.fuel_liters.message}
            </span>
          )}{" "}
        </div>

        <span
          className="ms-2 font-light text-base underline text-blue-400 cursor-pointer hover:opacity-50"
          onClick={handleSectionPlus}
        >
          Adicionar mais detalhes
        </span>
        {sectionPlus ? (
          <section className="flex flex-col mt-4">
            {/* local do abastecimento */}
            <div className="flex flex-col max-w-[300px] slg:max-w-[450px] mb-5">
              <label
                htmlFor="date"
                className="text-base font-semibold mb-2 ml-1 "
              >
                Localização:
              </label>
              <input
                type="text"
                id="location"
                className=" h-12 border rounded-lg py-2  px-3 leading-tight focus:outline-none"
                placeholder="Posto de Gasolina do João "
                {...register("location")}
              />
              {errors.location && (
                <span className="text-sm ml-2 mt-1.5 text-red-300">
                  {errors.location.message}
                </span>
              )}{" "}
            </div>

            {/* metodo de pagamento */}
            <div className="flex flex-col max-w-[300px] slg:max-w-[450px] mb-5">
              <label
                htmlFor="method_payment"
                className="text-base font-semibold mb-2 ml-1"
              >
                Metodo de Pagamento:
              </label>
              <select
                id="method_payment"
                className="h-12 border rounded-lg py-2 px-3 leading-tight focus:outline-none"
                {...register("method_payment")}
              >
                <option value="">Selecione um método de pagamento</option>
                <option value="crédito">Cartão de Crédito</option>
                <option value="débito">Cartão de Débito</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="pix">PIX</option>
                <option value="cheque">Cheque</option>
                <option value="transferência">Transferência Bancária</option>
              </select>
              {errors.method_payment && (
                <span className="text-sm ml-2 mt-1.5 text-red-300">
                  {errors.method_payment.message}
                </span>
              )}
            </div>

            <div className="flex flex-col max-w-[300px] slg:max-w-[450px] mb-5">
              <label
                htmlFor="date"
                className="text-base font-semibold mb-2 ml-1 "
              >
                Observação:
              </label>
              <textarea
                id="observation"
                className=" h-24  border rounded-lg py-2 px-3 leading-tight focus:outline-none"
                placeholder="Observação para controle"
                {...register("observation")}
              />
              {errors.observation && (
                <span className="text-sm ml-2 mt-1.5 text-red-300">
                  {errors.observation.message}
                </span>
              )}{" "}
            </div>
          </section>
        ) : (
          <></>
        )}

        <section className="flex gap-2">
          <button
            type="submit"
            className="px-3 py-2 w-40 mt-5 rounded-lg text-white bg-yellow-600 hover:bg-opacity-80"
          >
            {loading ? <Loading /> : "Atualizar"}
          </button>
          <button
            type="button"
            className="px-3 py-2 w-40 mt-5 rounded-lg text-zinc-400 hover:border hover:border-yellow-600"
            onClick={handleClose}
          >
            Cancelar
          </button>
        </section>
      </form>
      {/* fim do formulario */}
    </Modal.Root>
  );
}
