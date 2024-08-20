"use client";

import { ExpenseTypeContext } from "@/providers/expense/expenseType";
import { ExpenseVehicleContext } from "@/providers/expense/expenseVehicle";
import { VehicleContext } from "@/providers/vehicle/vehicle";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { addHours, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Locale } from "date-fns";
import { ExpenseServiceContext } from "@/providers/expense/expenseService";
import { Modal } from "@/components/modals";
import "../../scrollbar/scrollbar.css";

interface UpdateExpenseVehicleProps {
  amount?: string;
  date?: string;
  description?: string;
  expense_type?: { id: string; name: string };

  km?: string;
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

export default function ExpenseVehicleUpdate({
  expenseVehicleId,
  item,
  handleClose,
}: DataProps) {
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);
  const [sectionPlus, setSectionPlus] = useState(false);

  const { selectedVehicleId, vehicle } = useContext(VehicleContext);
  const { GetExpenseType, expenseType } = useContext(ExpenseTypeContext);
  const {
    UpdateExpenseVehicle,
    GetExpenseVehicle,
    expenseVehicle,
    setTabRouteConfig,
  } = useContext(ExpenseVehicleContext);
  const { GetExpenseService, expenseService } = useContext(
    ExpenseServiceContext
  );

  useEffect(() => {
    if (
      expenseType === null ||
      expenseService === null ||
      expenseVehicle === null
    ) {
      Promise.all([GetExpenseType(), GetExpenseService(), GetExpenseVehicle()]);
    }
  }, []);

  const filteredExpenseType = expenseType?.filter(
    (item) =>
      item.name.toLowerCase() !== "abastecimento" &&
      item.name.toLowerCase() !== "manutenção"
  );

  const date = new Date(item.date ? item.date : new Date());
  const time = new Date(item.date ? item.date : new Date());

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
    description: item.description ?? "",
    location: item.location ?? "",
    km: item.km ?? "",
    amount: item.amount ?? "",
    method_payment: item.method_payment ?? "",
    observation: item.observation ?? "",
    expense_type_id: item?.expense_type?.id ?? "",
    vehicleId: selectedVehicleId,
  };

  const schema = z.object({
    date: z.string().min(1, "data obrigatória"),
    time: z.string().min(1, "hora obrigatória"),

    description: z.string().min(1, "descrição do gasto obrigatório"),
    location: z.string(),
    km: z.string().min(1, "quilometragem atual obrigatória"),
    amount: z.string().min(1, "total gasto obrigatório"),
    method_payment: z.string().nullable(),
    observation: z.string(),
    expense_type_id: z.string(),
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
      await UpdateExpenseVehicle(
        expenseVehicleId,
        formattedValueWithNumbers
      ).finally(() => {
        setLoading(false);
        handleClose();
      });

      setLoading(false);
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

  useEffect(() => {
    if (item.expense_type) {
      const firstServiceName = item.expense_type.name;
      const description = `Despesa - ${firstServiceName} `;

      setValue("description", description);
    } else {
      setValue("description", "");
    }
  }, [item.expense_type]);

  const handleRouteConfig = () => {
    setTabRouteConfig("Tipo de Serviço");
    push("/dashboard/config");
  };

  return (
    <Modal.Root onClose={handleClose}>
      <Modal.Title
        icon={Wrench}
        sizeIcon={22}
        borderColor="border-red-700"
        title="Atualizar Despesa"
        onClose={handleClose}
      />

      {/* formulario */}
      <form
        action="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-[500px] "
      >
        {/* tipo de despesa */}
        <div className="flex flex-col mb-5">
          <label
            htmlFor="expense_type"
            className="text-base font-semibold mb-2 ml-1"
          >
            Tipo de Despesa:*
          </label>
          <select
            id="expense_type"
            className="h-12 border rounded-lg py-2 px-3 leading-tight focus:outline-none"
            {...register("expense_type_id")}
            defaultValue={item?.expense_type?.name ?? ""}
          >
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
          )}
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

        <span
          className="ms-2 font-light text-base underline text-blue-400 cursor-pointer hover:opacity-50"
          onClick={handleSectionPlus}
        >
          Adicionar mais detalhes
        </span>
        {sectionPlus ? (
          <section className="flex flex-col mt-4 mb-4">
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
          <div className="mb-4" />
        )}

        <Modal.Actions
          type="submit"
          onSubmitAction={() => handleSubmit(onSubmit)}
          onCancelAction={handleClose}
          loading={loading}
          bgColorSubmit="bg-red-700"
          nameButtonSubmit="Atualizar"
        />
      </form>
      {/* fim do formulario */}
    </Modal.Root>
  );
}
