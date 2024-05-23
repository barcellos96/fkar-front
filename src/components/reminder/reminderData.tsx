"use client";

import { useContext, useEffect, useState } from "react";
import ReminderPageLayout from ".";
import { ReminderContext } from "@/providers/reminder";
import {
  AlarmClock,
  AlarmClockPlus,
  CalendarDays,
  CornerDownRight,
  Map,
  MessageSquareText,
  Pencil,
  Text,
  Trash,
} from "lucide-react";
import TableSkeleton from "../tablesNotData/skeleton";
import { differenceInDays, format } from "date-fns";
import { Modal } from "../modals";

interface ReminderProps {
  id: string;
  title?: string;
  date_reminder?: string;
  km_reminder?: number;
  description?: string;
}

// Função para adicionar horas a uma data
const addHours = (date: Date, hours: number) => {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
};

// Função para formatar a data e hora
const formatDateWithAddedHours = (
  date: Date,
  hoursToAdd: number,
  formatString: string
): string => {
  const newDate = addHours(date, hoursToAdd);
  return format(newDate, formatString);
};

// Função para calcular os dias restantes
const calculateDaysRemaining = (dateString: string) => {
  const currentDate = new Date();
  const targetDate = new Date(dateString);
  return differenceInDays(targetDate, currentDate);
};

export default function ReminderData() {
  const { GetReminder, reminder, value, DeleteReminder, UpdateReminder } =
    useContext(ReminderContext);

  const [onModal, setOnModal] = useState(false);
  const [onModalUpdate, setOnModalUpdate] = useState(false);
  const [selectedReminder, setSelectedReminder] =
    useState<ReminderProps | null>(null);
  const [loading, setLoading] = useState(false);

  const [modalData, setModalData] = useState({
    title: "",
    date_reminder: "",
    km_reminder: 0,
    description: "",
  });

  const [selectedInput, setSelectedInput] = useState("date");

  useEffect(() => {
    if (reminder === null) {
      const fetchData = async () => {
        GetReminder();
      };

      fetchData();
    }
  }, [value]);

  const handleOpennModal = (item: ReminderProps) => {
    setSelectedReminder(item);

    const dateReminder = new Date(item.date_reminder ? item.date_reminder : "");
    const formattedDateReminder = formatDateWithAddedHours(
      dateReminder,
      3,
      "yyyy-MM-dd HH:mm"
    );

    setModalData({
      title: item?.title ? item?.title : "",
      date_reminder: formattedDateReminder,
      km_reminder: item?.km_reminder ? item?.km_reminder : Number(""),
      description: item?.description ? item?.description : "",
    });
    setOnModal(true);
  };

  const handleCloseModal = () => {
    setOnModal(false);
    setOnModalUpdate(false);
  };
  const handleCheckboxChange = (input: string) => {
    setSelectedInput(input);
  };

  const typeModal = onModalUpdate ? "Atualizar " : "Deletar ";
  const colorSubmit = onModalUpdate ? "bg-yellow-600" : "bg-red-700";

  const handleSubmit = () => {
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

    console.log("dataToSend ", dataToSend);

    if (selectedReminder) {
      onModalUpdate
        ? UpdateReminder(selectedReminder.id, dataToSend).finally(() => {
            setLoading(false);
            handleCloseModal();
          })
        : DeleteReminder(selectedReminder.id).finally(() => {
            setLoading(false);
            handleCloseModal();
          });
    }
  };

  return (
    <>
      {!reminder ? (
        <div className="w-full h-full rounded-xl bg-white gap-4 px-6 py-3 mt-3 shadow-lg">
          <TableSkeleton />
        </div>
      ) : (
        <ReminderPageLayout>
          {reminder?.map((item, index) => (
            <tr
              className="flex flex-col slg:table-row border-b px-2 py-4 slg:px-0 slg:py-0"
              key={index}
            >
              <td className="hidden slg:table-cell font-normal py-5">
                {index + 1}
              </td>

              <td className="flex justify-between items-center slg:table-cell font-semibold text-lg slg:text-base slg:font-normal slg:px-3 slg:max-w-32">
                <span className="hidden slg:table-cell">
                  {item.title
                    .toLowerCase()
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </span>
                <section className="slg:hidden flex items-center gap-2">
                  <span>
                    <AlarmClockPlus width={20} height={20} />
                  </span>
                  <span>
                    {item.title
                      .toLowerCase()
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </span>
                </section>

                <section className="flex gap-2 slg:hidden">
                  <button
                    onClick={() => {
                      setOnModalUpdate(true);
                      handleOpennModal(item);
                    }}
                    className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                  >
                    <Pencil width={15} color="white" />
                  </button>
                  <button
                    onClick={() => handleOpennModal(item)}
                    className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                  >
                    <Trash width={15} color="white" />
                  </button>
                </section>
              </td>

              <td className="flex items-center gap-2 slg:table-cell font-light text-base slg:font-normal min-w-32 ">
                <span className="slg:hidden">
                  <CalendarDays width={15} height={15} />
                </span>
                {!item.date_reminder
                  ? null
                  : formatDateWithAddedHours(
                      new Date(item.date_reminder),
                      3, // Adiciona 3 horas
                      "dd/MM/yyyy HH:mm"
                    )}
                <br />
                <section className="flex gap-1">
                  <CornerDownRight height={10} width={10} />
                  <span className="text-sm text-gray-500">
                    {calculateDaysRemaining(
                      item.date_reminder ? item.date_reminder : ""
                    ) < 0 ? (
                      <span className="text-red-500">
                        há&nbsp;
                        {calculateDaysRemaining(
                          item.date_reminder ? item.date_reminder : ""
                        )}
                        &nbsp;dias
                      </span>
                    ) : (
                      <span className="text-green-700">
                        faltam&nbsp;
                        {calculateDaysRemaining(
                          item.date_reminder ? item.date_reminder : ""
                        )}
                        &nbsp;dias
                      </span>
                    )}
                  </span>
                </section>
              </td>

              <td className="flex items-center gap-2 slg:table-cell font-light text-base slg:font-normal slg:px-4">
                <span className="slg:hidden">
                  {item.km_reminder ? (
                    <Map width={15} height={15} />
                  ) : undefined}
                </span>
                {item.km_reminder}
              </td>
              <td className="slg:hidden flex gap-2  font-light text-base slg:font-normal min-w-36 ">
                <span className="slg:hidden mt-1">
                  {item.description ? (
                    <MessageSquareText width={15} height={15} />
                  ) : undefined}
                </span>

                {item.description}
              </td>
              <td className="hidden slg:flex gap-2 py-4 px-2  justify-end">
                <button
                  onClick={() => {
                    setOnModalUpdate(true);
                    handleOpennModal(item);
                  }}
                  className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                >
                  <Pencil width={15} color="white" />
                </button>
                <button
                  onClick={() => handleOpennModal(item)}
                  className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                >
                  <Trash width={15} color="white" />
                </button>
              </td>
            </tr>
          ))}
        </ReminderPageLayout>
      )}
      {onModal && selectedReminder && (
        <div className="fixed inset-0 z-50 top-0 left-0 h-full w-full flex flex-col items-center justify-center bg-black bg-opacity-10">
          <Modal.Root onClose={handleCloseModal}>
            <Modal.Title
              title={`${typeModal} Lembrete`}
              onClose={handleCloseModal}
            />

            {onModalUpdate ? (
              <>
                <Modal.Input
                  icon={AlarmClock}
                  type="text"
                  id="title"
                  placeholder="Titulo"
                  value={modalData.title}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      title: e.target.value,
                    })
                  }
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
                  <div className="flex gap-3">
                    <Modal.Input
                      // icon={CalendarDays}
                      type="date"
                      id="date_reminder"
                      placeholder="DD/MM/YYYY"
                      className="cursor-pointer"
                      value={modalData.date_reminder.split(" ")[0] || ""}
                      onChange={(e) => {
                        setModalData({
                          ...modalData,
                          date_reminder: `${e.target.value} ${
                            modalData.date_reminder.split(" ")[1] || ""
                          }`,
                        });
                      }}
                    />
                    <Modal.Input
                      // icon={Clock}
                      type="time"
                      id="time_reminder"
                      placeholder="00:00"
                      value={modalData.date_reminder.split(" ")[1] || ""}
                      onChange={(e) =>
                        setModalData({
                          ...modalData,
                          date_reminder: `${
                            modalData.date_reminder.split(" ")[0]
                          } ${e.target.value}`,
                        })
                      }
                    />
                  </div>
                )}
                {selectedInput === "hodometer" && (
                  <Modal.Input
                    icon={Map}
                    type="text"
                    id="km_reminder"
                    placeholder="Hodometro(km)"
                    value={
                      modalData.km_reminder !== null
                        ? modalData.km_reminder
                        : ""
                    }
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
                    setModalData({
                      ...modalData,
                      description: e.target.value,
                    })
                  }
                />
              </>
            ) : (
              <div className="uppercase text-base font-light border border-zinc-200 rounded-lg px-2 py-4 flex flex-col gap-3 bg-zinc-100">
                <span className="flex items-center  gap-2 text-lg font-semibold">
                  <AlarmClock width={15} height={15} />
                  {selectedReminder.title}
                </span>

                {selectedReminder.date_reminder ? (
                  <span className="flex items-center gap-2 text-base font-light">
                    <CalendarDays width={15} height={15} />
                    {format(
                      new Date(selectedReminder.date_reminder),
                      "dd/MM/yyyy HH:mm"
                    )}
                  </span>
                ) : undefined}

                {selectedReminder.km_reminder ? (
                  <span className="flex items-center  gap-2">
                    <Map width={15} height={15} />
                    {selectedReminder.km_reminder}
                  </span>
                ) : undefined}

                {selectedReminder.description ? (
                  <span className="flex items-center  gap-2">
                    <MessageSquareText width={15} height={15} />
                    {selectedReminder.description}
                  </span>
                ) : undefined}
              </div>
            )}
            <Modal.Actions
              onSubmitAction={() => {
                setLoading(true);
                handleSubmit();
              }}
              loading={loading}
              onCancelAction={handleCloseModal}
              bgColorSubmit={colorSubmit}
              nameButtonSubmit={typeModal}
            />
          </Modal.Root>
        </div>
      )}
    </>
  );
}
