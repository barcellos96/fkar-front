"use client";

import Loading from "@/components/loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlarmClock, ChevronLeft, Plus, TrendingDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { addHours, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Locale } from "date-fns";
import { ReminderContext } from "@/providers/reminder";
import HeaderComposition from "../header/headerComposition";
import { NotDataTable } from "../tablesNotData";

import IconAlarm from "../../assets/icon-alarm.jpg";
import { Modal } from "../modals";

interface Props {
  children: ReactNode[];
}

export default function ReminderPageLayout({ children }: Props) {
  const [loading, setLoading] = useState(false);
  const [onModal, setOnModal] = useState(false);

  const { CreateReminder } = useContext(ReminderContext);

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
    title: "",
    date: formattedDate,
    time: formattedTime,
    description: "",
  };

  const schema = z.object({
    title: z.string().min(1, "descrição do gasto obrigatório"),
    date: z.string().min(1, "data obrigatória"),
    time: z.string().min(1, "hora obrigatória"),
    description: z.string(),
  });

  type RegisterProps = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProps>({
    values: defaultValues,
    resolver: zodResolver(schema),
  });

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

    const formattedValue = { ...rest, date_reminder: dateFormated };

    // Convertendo os campos necessários de string para number
    const formattedValueWithNumbers = {
      ...formattedValue,
    };

    console.log("formattedValueWithNumbers", formattedValueWithNumbers);
    setLoading(true);
    try {
      await CreateReminder(formattedValueWithNumbers);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setOnModal((prev) => !prev);
  };

  const handleCloseModal = () => {
    setOnModal(false);
  };

  return (
    <div className="w-full rounded-xl gap-4 px-6 py-5 mt-3 mb-5 shadow-lg bg-white">
      <HeaderComposition
        nameButton="Novo Lembrete"
        typeSubmit="button"
        title="Lembretes"
        icon={AlarmClock}
        handleSubmit={handleOpenModal}
      />

      {children.length === 0 ? (
        <div className="flex flex-col items-center justify-center pb-5">
          <NotDataTable.Root>
            <NotDataTable.Body
              img={IconAlarm}
              actionButton={handleOpenModal}
              icon={Plus}
              title="Lembrete"
            />
          </NotDataTable.Root>
        </div>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr className="hidden slg:table-row text-left">
              <th className="py-3">#</th>
              <th className="py-3">Titulo</th>
              <th className="py-3">Data</th>
              <th className="py-3 px-3">Hodometro</th>
              {/* <th className="py-3">Descrição</th> */}
              <th className="text-right py-3 pr-8">{/* Ação */}</th>
            </tr>
          </thead>

          <tbody className="font-light text-base">{children}</tbody>
        </table>
      )}

      {onModal && (
        <div className="fixed inset-0 z-50 top-0 left-0 h-full w-full flex flex-col items-center justify-center bg-zinc-900 bg-opacity-50">
          <Modal.Root onClose={handleCloseModal}>
            <Modal.Title title="Novo Lembrete" onClose={handleCloseModal} />
            <form action="form" onSubmit={handleSubmit(onSubmit)}>
              {/* descrição */}
              <div className="flex flex-col  mb-5">
                <label
                  htmlFor="title"
                  className="text-base font-semibold mb-2 ml-1 "
                >
                  Titulo:*
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
              <button
                type="submit"
                className="px-3 py-2 w-40 mt-5 rounded-lg text-white bg-green-700 hover:bg-opacity-80"
              >
                {loading ? <Loading /> : "Cadastrar"}
              </button>
            </form>
          </Modal.Root>
        </div>
      )}
    </div>
  );
}
