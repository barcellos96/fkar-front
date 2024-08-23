"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import RefulingLayout from ".";
import {
  ExpenseType,
  ExpenseVehicleContext,
  ExpenseVehicleServicesProps,
  User,
  Vehicle,
} from "@/providers/expense/expenseVehicle";
import { ExpenseTypeContext } from "@/providers/expense/expenseType";
import TableSkeleton from "../../tablesNotData/skeleton";
import {
  BadgeDollarSign,
  CalendarDays,
  CalendarDaysIcon,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Equal,
  Eye,
  Fuel,
  FuelIcon,
  Map,
  MessageSquareText,
  Pencil,
  Plus,
  Text,
  Trash,
} from "lucide-react";
import { formatKm } from "@/hooks/km";
import { format, parseISO } from "date-fns";
import { parseCookies } from "nookies";
import { VehicleContext } from "@/providers/vehicle/vehicle";
import { LoadingSpinner } from "../../loading";
import { NotDataTable } from "@/components/tablesNotData";

import IconRefueling from "../../../assets/refueling.png";
import { useRouter } from "next/navigation";
import formatNumberWithSpaces from "@/utils/formatCurrencyWhiteSpaces";
import { Modal } from "@/components/modals";
import RefuelingUpdate from "./refuelingUpdate";
import RefuelingSelf from "./refuelingSelf";
import SearchInput from "@/components/timeline/search";
import formattedDate from "@/utils/formatedDate";

interface ExpenseVehicleProps {
  id?: string;
  date: string;
  description: string;
  amount: number;
  fuel_type?: string | null;
  fuel_liters?: number | null;
  price_liters?: number | null;
  km: number;
  location: string;
  method_payment?: string | null;
  status_payment?: boolean;
  observation?: string | null;
  user: User;
  vehicle: Vehicle;
  expense_type: ExpenseType;
  expense_vehicle_services?: ExpenseVehicleServicesProps[];
}

export default function RefuelingData() {
  const { push } = useRouter();

  const handleSubmit = () => {
    push("/dashboard/abastecimento/criar");
  };
  const { GetExpenseVehicle, expenseVehicle, value, DeleteExpenseVehicle } =
    useContext(ExpenseVehicleContext);
  const { GetExpenseType, expenseType } = useContext(ExpenseTypeContext);
  const { selectedVehicleId } = useContext(VehicleContext);

  const [selectedRefueling, setSelectedRefueling] =
    useState<ExpenseVehicleProps | null>(null);

  const [query, setQuery] = useState<string>("");

  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalEye, setModalEye] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limitPage, setLimitPage] = useState<number>(5);

  useEffect(() => {
    if (expenseType === null) {
      GetExpenseType();
    }
  }, [value]);

  useEffect(() => {
    setLoading(true); // Inicia o estado de loading

    if (expenseType) {
      expenseType?.map((item) => {
        if (item.name.toLowerCase() === "abastecimento") {
          const cookies = parseCookies();
          const savedVehicleId = cookies["vehicle:selectedVehicleId"];

          GetExpenseVehicle(
            item.id,
            savedVehicleId,
            currentPage,
            limitPage,
            query
          ).finally(() => {
            setLoading(false); // Finaliza o estado de loading
          });
        } else {
          setLoading(false); // Finaliza o estado de loading se não for necessário chamar GetExpenseVehicle
        }
      });
    }
  }, [expenseType, selectedVehicleId, currentPage, limitPage, value, query]);

  if (!expenseVehicle) {
    return <TableSkeleton />; // Mostra o skeleton enquanto carrega
  }

  if (query.length === 0 && expenseVehicle?.data.length === 0) {
    return (
      <div className="flex flex-col items-center bg-white rounded-lg mt-3 shadow-lg justify-center pb-5 ">
        <NotDataTable.Root>
          <NotDataTable.Body
            img={IconRefueling}
            actionButton={handleSubmit}
            icon={Plus}
            title="Abastecimento"
          />
        </NotDataTable.Root>
      </div>
    );
  }

  const handleNextPage = () => {
    if (currentPage < expenseVehicle.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleChangeLimitPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value); // Converte o valor para número
    setLimitPage(newLimit); // Atualiza o estado limitPage com o novo valor
  };

  const handleOpenModal = (item: ExpenseVehicleProps) => {
    setSelectedRefueling(item);
    setModal(true);
  };

  const handleOpenModalEye = (item: ExpenseVehicleProps) => {
    setSelectedRefueling(item);
    setModalEye(true);
  };

  const handleOpenModalUpdate = (item: ExpenseVehicleProps) => {
    setSelectedRefueling(item);
    setModalUpdate(true);
  };

  const handleCloseModal = () => {
    setModal(false);
    setModalUpdate(false);
    setModalEye(false);
  };

  const handleSubmitModal = () => {
    if (selectedRefueling) {
      DeleteExpenseVehicle(selectedRefueling.id).finally(() => {
        setLoading(false);
        setModal(false);
      });
    }
  };

  const typeModal = modalUpdate ? "Atualizar " : "Excluir ";
  const colorSubmit = modalUpdate ? "bg-yellow-600" : "bg-red-700";
  const borderColor = modalUpdate ? "border-yellow-600" : "border-red-700";

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  // Filter data after fetching
  const filteredExpenseVehicleData = expenseVehicle?.data.filter(
    (item) => item.expense_type?.name.toLowerCase() === "abastecimento"
  );

  return (
    <>
      <RefulingLayout
        pagination={
          <div className=" slg:flex items-center gap-4 w-full ps-1 mt-5 text-zinc-400 font-light text-base ">
            <div className="sm:flex items-center gap-4">
              {`Linhas por página: `}

              <select
                id="limitPage"
                value={limitPage}
                onChange={handleChangeLimitPage}
                className="border rounded px-2 py-1 cursor-pointer focus:outline-none"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>

              <div className="flex items-center gap-4 text-nowrap mt-3 sm:mt-0">
                <section>
                  {`${currentPage} - ${expenseVehicle.totalPages} `}{" "}
                </section>
                <section className="flex gap-3 items-center">
                  <ChevronLeft
                    width={20}
                    height={20}
                    className={`cursor-pointer hover:scale-125 ${
                      currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                    }`}
                    onClick={handlePrevPage}
                  />
                  <ChevronRight
                    width={20}
                    height={20}
                    className={`cursor-pointer hover:scale-125 ${
                      currentPage === expenseVehicle.totalPages
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                    onClick={handleNextPage}
                  />
                </section>
              </div>
            </div>

            <section className="mt-3 slg:mt-0">{`Total abastecimentos: ${expenseVehicle.total}`}</section>
          </div>
        }
        searchInput={<SearchInput onSearch={handleSearch} />}
      >
        {loading && (
          <tr>
            <td>
              <LoadingSpinner />
            </td>
          </tr>
        )}

        {!loading &&
          filteredExpenseVehicleData.length > 0 &&
          filteredExpenseVehicleData.map((item, index) => (
            <tr
              className="flex flex-col slg:table-row border-b px-2 py-4 slg:px-0 slg:py-0 gap-1 "
              key={index}
            >
              <td className="py-3 hidden slg:table-cell">{index + 1} - </td>
              <td className="slg:hidden">
                <section className="slg:hidden absolute flex gap-2  justify-end w-4/5">
                  <button
                    className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                    onClick={() => handleOpenModalEye(item)}
                  >
                    <Eye width={15} color="white" />
                  </button>
                  <button
                    className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                    onClick={() => handleOpenModalUpdate(item)}
                  >
                    <Pencil width={15} color="white" />
                  </button>
                  <button
                    className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                    onClick={() => handleOpenModal(item)}
                  >
                    <Trash width={15} color="white" />
                  </button>
                </section>
                <span className="flex gap-2 slg:hidden">
                  <Text width={17} height={17} className="slg:hidden" />
                  {item.description}
                </span>
              </td>
              <td className="slg:py-3 ">
                <span className="flex gap-2 slg:table-cell">
                  <CalendarDays width={17} height={17} className="slg:hidden" />
                  {formattedDate(new Date(item.date))}
                </span>
              </td>
              <td className="slg:py-3">
                <span className="flex gap-2 slg:table-cell">
                  <Fuel width={17} height={17} className="slg:hidden" />
                  {item.fuel_type}
                </span>
              </td>
              <td className="slg:py-3 ">
                <span className="hidden slg:col-span-1">R$</span>
                <section className="flex gap-3 flex-wrap">
                  <span className="flex gap-2 slg:table-cell">
                    <BadgeDollarSign
                      width={17}
                      height={17}
                      className="slg:hidden"
                    />
                    R$ / L {item.price_liters}
                  </span>
                  <Plus width={17} height={17} className="slg:hidden" />
                  <span className="flex gap-2 slg:hidden">
                    <Droplets width={17} height={17} />
                    {item.fuel_liters}
                  </span>
                  <Equal width={17} height={17} className="slg:hidden" />
                  <span className="flex gap-2 slg:hidden">
                    <BadgeDollarSign width={17} height={17} />
                    R$ {formatNumberWithSpaces(item.amount)}
                  </span>
                </section>
              </td>
              <td className="hidden slg:table-cell slg:py-3 ">
                {item.fuel_liters}
              </td>
              <td className="slg:py-3 hidden slg:table-cell ">
                R$ {formatNumberWithSpaces(item.amount)}
              </td>
              <td className="slg:py-3 hidden lg:table-cell">
                {formatKm(item.km)}
              </td>
              <td className="hidden  slg:flex gap-2 py-4 px-2  justify-end">
                <button
                  className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                  onClick={() => handleOpenModalEye(item)}
                >
                  <Eye width={15} color="white" />
                </button>
                <button
                  className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                  onClick={() => handleOpenModalUpdate(item)}
                >
                  <Pencil width={15} color="white" />
                </button>
                <button
                  className={`bg-green-600 flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                  onClick={() => handleOpenModal(item)}
                >
                  <Trash width={15} color="white" />
                </button>
              </td>
            </tr>
          ))}
      </RefulingLayout>

      {modalUpdate && selectedRefueling && (
        <RefuelingUpdate
          handleClose={handleCloseModal}
          expenseVehicleId={selectedRefueling.id ?? ""}
          item={{
            ...selectedRefueling,
            amount: selectedRefueling.amount.toString(),
            fuel_liters: selectedRefueling.fuel_liters?.toString() ?? null,
            price_liters: selectedRefueling.price_liters?.toString() ?? null,
            km: selectedRefueling.km.toString(), // Converter km para string
          }}
        />
      )}

      {modalEye && selectedRefueling && (
        <RefuelingSelf
          handleClose={handleCloseModal}
          item={{
            ...selectedRefueling,
            amount: selectedRefueling.amount.toString(),
            fuel_liters: selectedRefueling.fuel_liters?.toString() ?? null,
            price_liters: selectedRefueling.price_liters?.toString() ?? null,
            km: selectedRefueling.km.toString(), // Converter km para string
          }}
        />
      )}

      {modal && selectedRefueling && (
        <div className="fixed inset-0 z-50 top-0 left-0 h-full w-full flex flex-col items-center justify-center bg-black bg-opacity-10">
          <Modal.Root onClose={handleCloseModal}>
            <Modal.Title
              title="Abastecimento"
              borderColor={borderColor}
              onClose={handleCloseModal}
            />

            <div className="uppercase text-base font-light border border-zinc-200 rounded-lg px-2 py-4 flex flex-col gap-3 bg-zinc-100">
              <span className="flex items-center  gap-2 text-lg font-semibold">
                {selectedRefueling.description}
              </span>

              {selectedRefueling.date ? (
                <span className="flex items-center gap-2 text-base font-light">
                  <CalendarDaysIcon width={15} height={15} />
                  {format(new Date(selectedRefueling.date), "dd/MM/yyyy HH:mm")}
                </span>
              ) : undefined}

              {selectedRefueling.fuel_type ? (
                <span className="flex items-center  gap-2">
                  <FuelIcon width={15} height={15} />
                  {selectedRefueling.fuel_type}
                </span>
              ) : undefined}

              {selectedRefueling.km ? (
                <span className="flex items-center  gap-2">
                  <Map width={15} height={15} />
                  {selectedRefueling.km}
                </span>
              ) : undefined}

              {selectedRefueling.fuel_liters ? (
                <div className="flex flex-col gap-2">
                  <section className="flex gap-2 items-center">
                    <span className="flex items-center gap-2">
                      <BadgeDollarSign width={15} height={15} />
                      R$/L {selectedRefueling.price_liters}
                    </span>
                    <Plus width={12} height={12} />
                    <span className="flex items-center  gap-2">
                      <Droplets width={15} height={15} />
                      {selectedRefueling.fuel_liters}
                    </span>
                    <Equal width={12} height={12} />
                  </section>
                  <span className="flex items-center  gap-2">
                    <BadgeDollarSign width={15} height={15} />
                    R$ {selectedRefueling.amount}
                  </span>
                </div>
              ) : undefined}

              {selectedRefueling.observation ? (
                <span className="flex items-center  gap-2">
                  <MessageSquareText width={15} height={15} />
                  {selectedRefueling.observation}
                </span>
              ) : undefined}
            </div>

            <Modal.Actions
              onSubmitAction={() => {
                setLoading(true);
                handleSubmitModal();
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
