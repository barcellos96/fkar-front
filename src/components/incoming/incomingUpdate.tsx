"use client";

import { VehicleContext } from "@/providers/vehicle/vehicle";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wrench } from "lucide-react";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { addHours, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Locale } from "date-fns";
import { Modal } from "@/components/modals";
import "../scrollbar/scrollbar.css";
import { IncomingContext } from "@/providers/incoming";

interface IncomingUpdateProps {
  id?: string;
  date?: string;
  title?: string;
  amount_received?: string;
  km?: string;
  observation?: string | null;
  incoming_type?: { id: string; name: string };
  vehicleId?: string;
}

interface DataProps {
  incomingId: string;
  item: IncomingUpdateProps;
  handleClose: () => void;
}

export default function IncomingUpdate({
  incomingId,
  item,
  handleClose,
}: DataProps) {
  const [loading, setLoading] = useState(false);
  const [sectionPlus, setSectionPlus] = useState(false);

  const { selectedVehicleId } = useContext(VehicleContext);

  const { UpdateIncoming, GetIncomingType, incomingType } =
    useContext(IncomingContext);

  useEffect(() => {
    if (incomingType === null) {
      GetIncomingType();
    }
  }, []);

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
    title: item.title ?? "",
    km: item.km ?? "",
    amount_received: item.amount_received ?? "",
    observation: item.observation ?? "",
    incomingTypeId: item.incoming_type?.id ?? "",
    vehicleId: selectedVehicleId,
  };

  const schema = z.object({
    date: z.string().min(1, "data obrigatória"),
    time: z.string().min(1, "hora obrigatória"),
    title: z.string().min(1, "descrição do gasto obrigatório"),
    km: z.string().min(1, "quilometragem atual obrigatória"),
    amount_received: z.string().min(1, "total gasto obrigatório"),
    observation: z.string(),
    incomingTypeId: z.string(),
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

  const amount = watch("amount_received").replace(/[^0-9.-]+/g, ""); // Remove tudo que não é número, ponto ou hífen

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

    // Convertendo os campos necessários de string para number
    const formattedValueWithNumbers = {
      ...formattedValue,
      km: Number(formattedValue.km.split(".").join("")),
      amount_received: Number(amount),
    };

    setLoading(true);

    try {
      await UpdateIncoming(incomingId, formattedValueWithNumbers).finally(
        () => {
          setLoading(false);
          handleClose();
        }
      );
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

  return (
    <Modal.Root onClose={handleClose}>
      <Modal.Title
        icon={Wrench}
        sizeIcon={22}
        borderColor="border-green-700"
        title="Atualizar Receita"
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
            htmlFor="incoming_type"
            className="text-base font-semibold mb-2 ml-1"
          >
            Tipo de Receita:*
          </label>

          <select
            id="incoming_type"
            className="h-12 border rounded-lg py-2 px-3 leading-tight focus:outline-none"
            {...register("incomingTypeId")}
            defaultValue={item?.incoming_type?.id ?? ""}

          >
            {incomingType?.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.incomingTypeId && (
            <span className="text-sm ml-2 mt-1.5 text-red-300">
              {errors.incomingTypeId.message}
            </span>
          )}
        </div>

        {/* descrição */}
        <div className="flex flex-col  mb-5">
          <label htmlFor="title" className="text-base font-semibold mb-2 ml-1 ">
            Descrição:*
          </label>
          <input
            type="text"
            id="title"
            className=" h-12 border rounded-lg py-2 px-3 leading-tight focus:outline-none"
            placeholder="Descrição"
            {...register("title")}
          />
          {errors.title && (
            <span className="text-sm ml-2 mt-1.5 text-red-300">
              {errors.title.message}
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
            htmlFor="amount_received"
            className="text-base font-semibold mb-2 ml-1 "
          >
            Valor da Despesa:*
          </label>
          <input
            type="text"
            id="amount_received"
            className=" h-12 border rounded-lg py-2 px-3 leading-tight focus:outline-none"
            placeholder="R$ Total"
            {...register("amount_received")}
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

              setValue("amount_received", `R$ ${inputValue}`);
            }}
          />
          {errors.amount_received && (
            <span className="text-sm ml-2 mt-1.5 text-red-300">
              {errors.amount_received.message}
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
          bgColorSubmit="bg-yellow-700"
          nameButtonSubmit="Atualizar"
        />
      </form>
      {/* fim do formulario */}
    </Modal.Root>
  );
}
