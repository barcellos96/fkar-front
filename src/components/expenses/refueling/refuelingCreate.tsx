"use client";

import { ExpenseTypeContext } from "@/providers/expense/expenseType";
import { ExpenseVehicleContext } from "@/providers/expense/expenseVehicle";
import { FuelContext } from "@/providers/fuel";
import { VehicleContext } from "@/providers/vehicle/vehicle";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, FuelIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Loading from "../../loading";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Locale } from "date-fns";
import LastRegisterKm from "@/components/vehicle/lastRegisterKm";

export default function ExpenseRefuelingCreate() {
  const { back, push } = useRouter();

  const [loading, setLoading] = useState(false);
  const [sectionPlus, setSectionPlus] = useState(false);

  const { GetFuelType, fuelType } = useContext(FuelContext);
  const { selectedVehicleId } = useContext(VehicleContext);
  const { GetExpenseType, expenseType } = useContext(ExpenseTypeContext);
  const { CreateExpenseVehicle } = useContext(ExpenseVehicleContext);

  useEffect(() => {
    if (fuelType === null || expenseType === null) {
      Promise.all([GetFuelType(), GetExpenseType()]);
    }
  }, []);

  const expenseTypeId = expenseType?.find(
    (item) => item.name.toLowerCase() === "abastecimento"
  );

  const date = new Date();
  const time = new Date();

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

  const defaultValues = {
    date: formattedDate,
    time: formattedTime,
    description: "Abastecimento",
    location: "",
    expense_type_id: expenseTypeId?.id ?? "",
    km: "",
    fuel_type: "",
    fuel_liters: "",
    price_liters: "",
    amount: "",
    method_payment: "",
    observation: "",
    vehicleId: selectedVehicleId,
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

  const amount = watch("amount").replace(/[^0-9.-]+/g, ""); // Remove tudo que não é número, ponto ou hífen
  const priceLiters = watch("price_liters").replace(/[^0-9.-]+/g, ""); // Aplica a mesma remoção para price_liters

  const fuelLitersValue = `${
    watch("amount") === "" ? 0 : Number(amount) / Number(priceLiters)
  }`;

  let roundedFuelLitersValue = Number(fuelLitersValue).toFixed(2);

  // Verifica se termina em .00 e ajusta para mostrar sem decimais
  if (roundedFuelLitersValue.endsWith(".00")) {
    roundedFuelLitersValue = Number(roundedFuelLitersValue).toFixed(0);
  }

  //verifica se é um numero valido ou se existe
  if (
    !roundedFuelLitersValue ||
    roundedFuelLitersValue === "NaN" ||
    roundedFuelLitersValue === "infinity"
  ) {
    roundedFuelLitersValue = "";
  }

  const onSubmit: SubmitHandler<RegisterProps> = async (value) => {
    // Combine date and time into a single Date object
    const dateTimeString = `${value.date}T${value.time}`;
    const dateTime = new Date(dateTimeString);

    const dateFormated = format(dateTime, "yyyy-MM-dd HH:mm:ss", {
      locale: ptBR as Locale,
    });

    const { time, ...rest } = value; // Desestruturando para remover a propriedade 'time'

    const formattedValue = { ...rest, date: dateFormated };

    // Incluir method_payment apenas se methodPaymentValue não for vazio
    if (formattedValue.method_payment == "") {
      formattedValue.method_payment = null;
    }

    // Convertendo os campos necessários de string para number
    const formattedValueWithNumbers = {
      ...formattedValue,
      km: Number(formattedValue.km.split(".").join("")),
      amount: Number(amount),
      price_liters: priceLiters,
    };

    formattedValueWithNumbers.fuel_liters = roundedFuelLitersValue;

    setLoading(true);
    try {
      await CreateExpenseVehicle(formattedValueWithNumbers);
      setLoading(false);
      push("/dashboard/abastecimento");
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSectionPlus = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSectionPlus(!sectionPlus);
  };

  // Função para formatar o número com pontos como separadores de milhares
  const formatNumber = (value: string) => {
    // Remove qualquer coisa que não seja número
    value = value.toString().replace(/\D/g, "");
    // Adiciona pontos como separadores de milhares
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return value;
  };

  return (
    <div className="w-full bg-white rounded-lg gap-4 px-6 py-5 mt-3 mb-5 shadow-lg">
      <section className="flex flex-col gap-3">
        <span
          className="flex items-center w-20 font-light cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            back();
          }}
        >
          <ChevronLeft width={22} height={22} /> Voltar
        </span>

        <h1 className="flex flex-row items-center gap-2 mt-4 mb-5 text-xl font-semibold">
          <FuelIcon
            className="bg-green-500 rounded-full p-2 text-white"
            width={40}
            height={40}
          />
          Cadastrar Abastecimento
        </h1>

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
            >
              <option value="">Selecione tipo de combustível</option>
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

          {/* km */}
          <div className="flex flex-col mb-5">
            <label htmlFor="km" className="text-base font-semibold mb-2 ml-1 ">
              Hodometro no abastecimento:*
            </label>
            <span className="ms-1 -mt-2 mb-2 text-sm">
              Ultimo registro: <LastRegisterKm />
            </span>
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

          <button
            type="submit"
            className="px-3 py-2 w-40 mt-5 rounded-lg text-white bg-green-700 hover:bg-opacity-80"
          >
            {loading ? <Loading /> : "Cadastrar"}
          </button>
        </form>
        {/* fim do formulario */}
      </section>
    </div>
  );
}
