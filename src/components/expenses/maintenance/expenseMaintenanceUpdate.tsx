"use client";

import Loading from "@/components/loading";
import { ExpenseTypeContext } from "@/providers/expense/expenseType";
import { ExpenseVehicleContext } from "@/providers/expense/expenseVehicle";
import { VehicleContext } from "@/providers/vehicle/vehicle";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LucideTrash2,
  Plus,
  PlusIcon,
  Search,
  Trash,
  TrendingDown,
  Wrench,
} from "lucide-react";
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
import formatNumberWithSpaces from "@/utils/formatCurrencyWhiteSpaces";

interface UpdateExpenseVehicleProps {
  amount?: string;
  date?: string;
  description?: string;
  expense_type_id?: { id: string; name: string };
  expense_vehicle_services?: ExpenseVehicleServices[] | null;

  km?: string;
  location?: string | null;
  method_payment?: string | null;
  status_payment?: boolean;
  observation?: string | null;
  vehicleId?: string;
}

interface SelectedService {
  id: string;
  value: string;
  expense_service: { id: string; name: string };
}

interface ExpenseVehicleServices {
  id: string;
  value: string;
  expense_service: {
    id: string;
    name: string;
  };
}

interface DataProps {
  expenseVehicleId: string;
  item: UpdateExpenseVehicleProps;
  handleClose: () => void;
}

export default function ExpenseMaintenanceUpdate({
  expenseVehicleId,
  item,
  handleClose,
}: DataProps) {
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);
  const [sectionPlus, setSectionPlus] = useState(false);
  const [modalSerivces, setModalServices] = useState(false);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    item.expense_vehicle_services ?? []
  );

  const [invalidInputs, setInvalidInputs] = useState<string[]>([]);

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

  const filterVehicleSelectedType = vehicle?.find(
    (v) => v.id === selectedVehicleId
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

  const expenseTypeMaintenanceId = expenseType?.find(
    (et) => et.name.toLowerCase() === "manutenção"
  );

  const filteredServices = expenseService?.filter((service) =>
    service.vehicle_types.some(
      (vt) =>
        vt.type.toLowerCase() ===
          filterVehicleSelectedType?.vehicle_type.type.toLowerCase() && service
    )
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
    expense_service_data: item.expense_vehicle_services ?? [],
    description: item.description ?? "",
    location: item.location ?? "",
    km: item.km ?? "",
    amount: item.amount ?? "",
    method_payment: item.method_payment ?? "",
    observation: item.observation ?? "",
    expense_type_id: expenseTypeMaintenanceId?.id
      ? expenseTypeMaintenanceId?.id
      : "",
    vehicleId: selectedVehicleId,
  };

  const schema = z.object({
    date: z.string().min(1, "data obrigatória"),
    time: z.string().min(1, "hora obrigatória"),
    expense_service_data: z
      .array(z.object({ id: z.string(), value: z.string() }))
      .min(1),
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

  useEffect(() => {
    setValue("expense_service_data", selectedServices);
  }, [selectedServices]);

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
      expense_service_data: selectedServices.map((item) => ({
        id: item.expense_service.id,
        value: item.value ? Number(item.value.split(" ").join("")) : 0,
      })),
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

  const handleCheckboxChange = (service: { id: string; name: string }) => {
    setSelectedServices((prevSelectedServices: SelectedService[]) => {
      const isSelected = prevSelectedServices.some(
        (selectedService) => selectedService.expense_service.id === service.id
      );

      if (isSelected) {
        return prevSelectedServices.filter(
          (selectedService) => selectedService.expense_service.id !== service.id
        );
      } else {
        return [
          ...prevSelectedServices,
          {
            id: service.id,
            value: "",
            expense_service: { id: service.id, name: service.name },
          },
        ];
      }
    });
  };

  const handleServiceValueChange = (serviceId: string, value: string) => {
    setSelectedServices((prevSelectedServices: SelectedService[]) =>
      prevSelectedServices.map((selectedService) =>
        selectedService.id === serviceId
          ? {
              ...selectedService,
              value: value,
            }
          : selectedService
      )
    );

    if (value) {
      setInvalidInputs(invalidInputs.filter((id) => id !== serviceId));
    } else if (!invalidInputs.includes(serviceId)) {
      setInvalidInputs([...invalidInputs, serviceId]);
    }
  };

  const handleRemoveService = (index: number) => {
    setSelectedServices((prevServices) =>
      prevServices.filter((_, i) => i !== index)
    );
  };

  const validateInputs = () => {
    const invalidInputs = selectedServices.filter((service) => !service.value);
    setInvalidInputs(invalidInputs.map((service) => service.id));
    return invalidInputs.length === 0;
  };

  const handleOpenModal = () => {
    setModalServices(true);
  };

  const handleCloseModal = () => {
    if (validateInputs()) {
      setModalServices(false);
    }
  };

  const totalValue = selectedServices.reduce((accumulator, service) => {
    const value = parseFloat(service.value.split(" ").join(""));
    return accumulator + (isNaN(value) ? 0 : value);
  }, 0);

  const formattedTotalValue = formatNumberWithSpaces(totalValue.toFixed(2));

  useEffect(() => {
    setValue("amount", formattedTotalValue);
  }, [formattedTotalValue, totalValue, selectedServices]);

  useEffect(() => {
    if (selectedServices && selectedServices.length > 0) {
      const firstServiceName = selectedServices[0].expense_service.name;
      const additionalServicesCount = selectedServices.length - 1;
      const description = `Serviço - ${firstServiceName} (+${additionalServicesCount})`;

      setValue("description", description);
    } else {
      setValue("description", "");
    }
  }, [selectedServices]);

  const handleRouteConfig = () => {
    setTabRouteConfig("Tipo de Serviço");
    push("/dashboard/config");
  };

  return (
    <Modal.Root onClose={handleClose}>
      <Modal.Title
        icon={Wrench}
        sizeIcon={22}
        borderColor="border-yellow-400"
        title="Atualizar Manutenção"
        onClose={handleClose}
      />

      {/* formulario */}
      <form
        action="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        {/* tipo de serviço */}
        <div className="flex flex-col mb-3">
          {selectedServices.length === 0 ? (
            <div className="flex flex-col">
              <label
                htmlFor="expense_service_data"
                className="text-base font-semibold mb-2 ml-1"
              >
                Tipo de Serviço:*
              </label>
              <button
                type="button"
                className=" h-12 border rounded-lg py-2 px-3 leading-tight bg-zinc-50 hover:bg-zinc-100 focus:outline-none"
                onClick={handleOpenModal}
              >
                Selecione seus serviços
              </button>
              {errors.expense_service_data && (
                <span className="text-sm ml-2 mt-1.5 text-red-300">
                  {errors.expense_service_data.message}
                </span>
              )}
            </div>
          ) : (
            <div className="max-w-[320px] slg:max-w-[400px] font-light text-base">
              <span className="flex font-semibold pb-2">
                Serviços executados:*
              </span>
              <ol>
                {selectedServices.map((services, index) => (
                  <li key={index} className="flex justify-between mb-2">
                    <span>{services.expense_service.name}</span>
                    <section className="flex items-center gap-2">
                      <span>
                        R${" "}
                        {services.value
                          ? formatNumberWithSpaces(
                              parseFloat(
                                services.value.split(" ").join("")
                              ).toFixed(2)
                            )
                          : "0.00"}
                      </span>
                      <LucideTrash2
                        className="text-green-700 cursor-pointer"
                        onClick={() => handleRemoveService(index)}
                        width={14}
                        height={14}
                      />
                    </section>
                  </li>
                ))}
              </ol>
              <div className="border-b-2 py-1" />

              <div className="flex justify-between font-semibold mt-2 mb-3">
                <span className="flex flex-1 ">TOTAL: </span>

                <input
                  id="amount"
                  value={`R$ ${formattedTotalValue}`}
                  {...register("amount")}
                  className="flex text-end bg-zinc-50"
                />
              </div>

              <section
                onClick={handleOpenModal}
                className="flex gap-1 items-center font-semibold text-sm text-green-700 cursor-pointer w-44 mb-8"
              >
                <PlusIcon width={16} height={16} />
                <span> ADICIONAR MAIS SERVIÇO</span>
              </section>
            </div>
          )}

          {modalSerivces && (
            <div className="fixed inset-0 z-50 top-0 left-0 h-full w-full flex flex-col items-center justify-center bg-black bg-opacity-10">
              <Modal.Root onClose={handleCloseModal}>
                <Modal.Title onClose={handleCloseModal} title="Serviços" />

                <div className="flex items-center gap-2 -mb-5">
                  <Modal.Input
                    icon={Search}
                    placeholder="pesquisar serviço..."
                  />

                  <section
                    onClick={handleRouteConfig}
                    className="flex w-8 h-8 justify-center items-center bg-green-700 rounded-md cursor-pointer mb-2 "
                  >
                    <Plus width={24} height={24} className="text-white" />
                  </section>
                </div>

                {filteredServices?.length === 0 ? (
                  <section className="flex flex-col gap-1 font-normal text-base border rounded-lg px-1 py-6 items-center justify-center">
                    <span>Nenhum serviço cadastrado</span>
                    <span>ou</span>
                    <span>Nenhum veículo selecionado</span>
                  </section>
                ) : (
                  <ol className="flex flex-col justify-center gap-3 border px-2 py-2 rounded-md overflow-auto custom-scrollbar">
                    {filteredServices?.map((service, index) => {
                      const selectedService = selectedServices.find(
                        (selectedService) =>
                          selectedService.expense_service.id === service.id
                      );

                      return (
                        <li className="flex gap-1 items-center" key={index}>
                          <input
                            id={service.name}
                            type="checkbox"
                            checked={!!selectedService}
                            onChange={() => handleCheckboxChange(service)}
                            className="outline-none"
                          />
                          <section className="flex items-center justify-between w-full">
                            <label id={service.name}>{service.name}</label>

                            {selectedService && (
                              <section className="flex gap-1">
                                <label>R$ </label>
                                <div className="flex flex-col">
                                  <input
                                    id={service.name}
                                    placeholder="Valor"
                                    className={`outline-none border-b w-28 pl-1 ${
                                      invalidInputs.includes(service.id)
                                        ? "border-red-500"
                                        : ""
                                    }`}
                                    value={selectedService.value}
                                    onChange={(e) => {
                                      let inputValue = e.target.value;
                                      // Remover caracteres não numéricos, exceto vírgula e ponto
                                      inputValue = inputValue.replace(
                                        /[^0-9,.]/g,
                                        ""
                                      );
                                      // Substituir vírgulas por pontos
                                      inputValue = inputValue.replace(",", ".");
                                      // Remover múltiplos pontos consecutivos
                                      inputValue = inputValue.replace(
                                        /(\..*)\./g,
                                        "$1"
                                      );

                                      // Limitar a apenas dois dígitos após o ponto
                                      inputValue = inputValue.replace(
                                        /(\.\d{2})\d+/g,
                                        "$1"
                                      );

                                      // Formatando com espaço a cada milhar
                                      inputValue = inputValue.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      );

                                      handleServiceValueChange(
                                        service.id,
                                        inputValue
                                      );
                                    }}
                                  />{" "}
                                  {invalidInputs.includes(service.id) && (
                                    <span className="text-red-500 text-sm">
                                      Valor obrigatório
                                    </span>
                                  )}
                                </div>
                              </section>
                            )}
                          </section>
                        </li>
                      );
                    })}
                  </ol>
                )}

                <Modal.Actions
                  type="button"
                  nameButtonSubmit="Salvar"
                  onSubmitAction={handleCloseModal}
                  onCancelAction={handleCloseModal}
                />
              </Modal.Root>
            </div>
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
          bgColorSubmit="bg-yellow-400"
          nameButtonSubmit="Atualizar"
        />
      </form>
      {/* fim do formulario */}
    </Modal.Root>
  );
}
