"use client";

import Loading from "@/components/loading";
import { ExpenseTypeContext } from "@/providers/expense/expenseType";
import { ExpenseVehicleContext } from "@/providers/expense/expenseVehicle";
import { VehicleContext } from "@/providers/vehicle/vehicle";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, TrendingDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { addHours, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Locale } from "date-fns";

export default function ExpenseVehicleCreate() {
  const { back, push } = useRouter();

  const [loading, setLoading] = useState(false);
  const [sectionPlus, setSectionPlus] = useState(false);

  const { selectedVehicleId } = useContext(VehicleContext);
  const { GetExpenseType, expenseType } = useContext(ExpenseTypeContext);
  const { CreateExpenseVehicle } = useContext(ExpenseVehicleContext);

  useEffect(() => {
    if (expenseType === null) {
      Promise.all([GetExpenseType()]);
    }
  }, []);

  const filteredExpenseType = expenseType?.filter(
    (item) =>
      item.name.toLowerCase() !== "abastecimento" &&
      item.name.toLowerCase() !== "manutenção"
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
    description: `Despesa - `,
    location: "",
    expense_type_id: "",
    km: "",
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

  const getValueExpenseType = watch("expense_type_id");

  useEffect(() => {
    const getNameExpenseType = expenseType?.find(
      (item) => item.id === getValueExpenseType
    );

    setValue(
      "description",
      `Despesa - ${getNameExpenseType?.name ? getNameExpenseType?.name : ""}`
    );
  }, [getValueExpenseType]);

  const amount = watch("amount").replace(/[^0-9.-]+/g, ""); // Remove tudo que não é número, ponto ou hífen

  const onSubmit: SubmitHandler<RegisterProps> = async (value) => {
    // Combine date and time into a single Date object
    const dateTimeString = `${value.date}T${value.time}`;
    const dateTime = new Date(dateTimeString);

    // Adjust for the time zone difference (Brasília is UTC-3)
    const adjustedDateTime = addHours(dateTime, 3); // Adjusting the time to UTC

    const dateFormated = format(adjustedDateTime, "yyyy-MM-dd HH:mm:ss", {
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
    };

    setLoading(true);
    try {
      await CreateExpenseVehicle(formattedValueWithNumbers);
      setLoading(false);
      push("/dashboard/despesas");
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
          <TrendingDown
            className="bg-red-500 rounded-full p-2 text-white"
            width={40}
            height={40}
          />
          Cadastrar Despesa
        </h1>

        {/* formulario */}
        <form
          action="form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col max-w-[500px] "
        >
          {/* tipo de Despesa */}
          <div className="flex flex-col mb-5">
            <label
              htmlFor="expense_type_id"
              className="text-base font-semibold mb-2 ml-1"
            >
              Tipo de Despesa:*
            </label>
            <select
              id="expense_type_id"
              className="h-12 border rounded-lg py-2 px-3 leading-tight focus:outline-none"
              {...register("expense_type_id")}
            >
              <option value="">Selecione tipo de desepsa</option>
              {filteredExpenseType?.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.expense_type_id && (
              <span className="text-sm ml-2 mt-1.5 text-red-300">
                {errors.expense_type_id.message}
              </span>
            )}
          </div>

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
              Hodometro atual:*
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

          {/* total */}
          <div className="flex flex-col  mb-5 slg:gap-5">
            <label
              htmlFor="amount"
              className="text-base font-semibold mb-2 ml-1 "
            >
              Valor da Despesa:*
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

                setValue("amount", `R$ ${inputValue}`);
              }}
            />
            {errors.amount && (
              <span className="text-sm ml-2 mt-1.5 text-red-300">
                {errors.amount.message}
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
