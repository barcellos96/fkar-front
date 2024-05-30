"use client";

import { AlarmClock, CalendarDays, Clock, Map, Plus, Text } from "lucide-react";
import HeaderComposition from "../header/headerComposition";
import { NotDataTable } from "../tablesNotData";
import { ReactNode, useContext, useState } from "react";

import IconAlarm from "../../assets/icon-alarm-calendar.png";
import TableSkeleton from "../tablesNotData/skeleton";
import { Modal } from "../modals";
import { ReminderContext } from "@/providers/reminder";
import { formatDate } from "@/hooks/date";
import { formatTime } from "@/hooks/time";

interface Props {
  children: ReactNode[];
}

export default function ReminderPageLayout({ children }: Props) {
  const { CreateReminder } = useContext(ReminderContext);
  const [onModal, setOnModal] = useState(false);
  const [selectedInput, setSelectedInput] = useState("date");

  const [loading, setLoading] = useState(false);
  const [checkErrors, setCheckErrors] = useState(false); // Estado para controlar a verificação de erros

  const [modalData, setModalData] = useState({
    title: "",
    date_reminder: "",
    km_reminder: Number(""),
    description: "",
  });

  const checkFormErrors = () => {
    return !modalData.title || !modalData.date_reminder;
  };

  const handleSubmit = () => {
    setLoading(true);
    setCheckErrors(true); // Habilita a verificação de erros ao enviar o formulário

    let dataToSend: {
      title: string;
      date_reminder?: string;
      km_reminder?: number;
      description: string;
    } = { ...modalData };

    if (modalData.km_reminder === 0) {
      const { km_reminder, ...rest } = dataToSend;
      dataToSend = rest;
    } else if (
      modalData.date_reminder === " " ||
      modalData.date_reminder === ""
    ) {
      const { date_reminder, ...rest } = dataToSend;
      dataToSend = rest;
    }

    if (!checkFormErrors()) {
      // Formata a data antes de enviar
      const date = dataToSend.date_reminder
        ? dataToSend.date_reminder.split(" ")[0].split("/").reverse().join("/")
        : "";
      const hour =
        dataToSend.date_reminder?.split(" ")[1] !== ""
          ? dataToSend.date_reminder?.split(" ")[1]
          : "09:00";

      const formatDateReminder = date + " " + hour;

      dataToSend.date_reminder = formatDateReminder;

      CreateReminder(dataToSend).finally(() => {
        setLoading(false);
        handleCloseModal();
      });
      setModalData({
        title: "",
        date_reminder: "",
        km_reminder: Number(""),
        description: "",
      });
      setCheckErrors(false); // Desabilita a verificação de erros após o envio
    } else {
      setLoading(false);
    }
  };

  const handleCloseModal = () => setOnModal(false);
  const handleOpenModal = () => setOnModal(true);

  const handleCheckboxChange = (input: string) => {
    setSelectedInput(input);
  };

  if (!children) {
    return <TableSkeleton />;
  }

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
            <Modal.Input
              icon={AlarmClock}
              type="text"
              id="title"
              placeholder="Titulo"
              value={modalData.title}
              onChange={(e) =>
                setModalData({ ...modalData, title: e.target.value })
              }
              errorMessage={
                checkErrors && !modalData.title
                  ? "Obrigatório preencher: Titulo"
                  : undefined
              } // Verifica se há erro somente após o envio do formulário
            />
            <div className="flex justify-start gap-3 -mt-2 -mb-2">
              <section className="flex items-center gap-3 border rounded-lg px-3 py-2">
                <label
                  htmlFor="date"
                  className="uppercase font-light text-base "
                >
                  Data
                </label>
                <input
                  type="checkbox"
                  id="date"
                  checked={selectedInput === "date"}
                  onChange={() => handleCheckboxChange("date")}
                />
              </section>
              <section className="flex items-center gap-3 border rounded-lg px-3 py-2">
                <label
                  htmlFor="hodometer"
                  className="uppercase font-light text-base "
                >
                  Hodômetro
                </label>
                <input
                  type="checkbox"
                  id="hodometer"
                  checked={selectedInput === "hodometer"}
                  onChange={() => handleCheckboxChange("hodometer")}
                />
              </section>
            </div>

            {selectedInput === "date" && (
              <div className="flex  gap-1  ">
                <Modal.Input
                  icon={CalendarDays}
                  type="text"
                  id="date_reminder"
                  placeholder="dd/mm/yyyy"
                  value={modalData.date_reminder.split(" ")[0]}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      date_reminder: `${formatDate(e.target.value)} ${
                        modalData.date_reminder.split(" ")[1] || ""
                      }`,
                    })
                  }
                  errorMessage={
                    checkErrors && !modalData.date_reminder
                      ? "Obrigatório preencher: Data"
                      : undefined
                  } // Verifica se há erro somente após o envio do formulário
                />
                <Modal.Input
                  icon={Clock}
                  type="text"
                  id="time_reminder"
                  placeholder="00:00"
                  value={modalData.date_reminder.split(" ")[1] || ""}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      date_reminder: `${
                        modalData.date_reminder.split(" ")[0]
                      } ${formatTime(e.target.value)}`,
                    })
                  }
                  errorMessage={
                    checkErrors && !modalData.date_reminder
                      ? "Obrigatório preencher: Hora"
                      : undefined
                  } // Verifica se há erro somente após o envio do formulário
                />
              </div>
            )}
            {selectedInput === "hodometer" && (
              <Modal.Input
                icon={Map}
                type="number"
                id="km_reminder"
                placeholder="Hodometro(km)"
                value={modalData.km_reminder !== 0 ? modalData.km_reminder : ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setModalData({
                    ...modalData,
                    km_reminder: Number(value),
                  });
                }}
              />
            )}
            <Modal.Input
              icon={Text}
              type="text"
              id="description"
              placeholder="Descrição"
              value={modalData.description}
              onChange={(e) =>
                setModalData({ ...modalData, description: e.target.value })
              }
            />
            <Modal.Actions
              onSubmitAction={() => {
                setLoading(true);
                handleSubmit();
              }}
              loading={loading}
              onCancelAction={handleCloseModal}
            />
          </Modal.Root>
        </div>
      )}
    </div>
  );
}
