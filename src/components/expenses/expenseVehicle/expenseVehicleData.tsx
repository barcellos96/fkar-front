"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  ExpenseType,
  ExpenseVehicleContext,
  User,
  Vehicle,
} from "@/providers/expense/expenseVehicle";
import {
  BadgeDollarSign,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  Map,
  Pencil,
  Plus,
  Text,
  Trash,
  TrendingDown,
} from "lucide-react";
import { formatKm } from "@/hooks/km";
import { format, parseISO } from "date-fns";
import { parseCookies } from "nookies";
import { VehicleContext } from "@/providers/vehicle/vehicle";
import TableSkeleton from "@/components/tablesNotData/skeleton";
import { LoadingSpinner } from "@/components/loading";
import ExpenseVehicleLayout from ".";
import { NotDataTable } from "@/components/tablesNotData";

import IconExpense from "../../../assets/expenses.png";
import { useRouter } from "next/navigation";
import ExpenseVehicleSelf from "./expenseVehicleSelf";
import ExpenseVehicleDelete from "./expenseVehicleDelete";
import ExpenseVehicleUpdate from "./expenseVehicleUpdate";
import formatNumberWithSpaces from "@/utils/formatCurrencyWhiteSpaces";
import SearchInput from "@/components/timeline/search";
import formattedDate from "@/utils/formatedDate";

interface ExpenseVehicleProps {
  id?: string;
  date: string;
  description: string;
  amount: number;

  km: number;
  location: string;
  method_payment?: string | null;
  status_payment?: boolean;
  observation?: string | null;
  user: User;
  vehicle: Vehicle;
  expense_type: ExpenseType;
}

export default function ExpenseVehicleData() {
  const { push } = useRouter();

  const handleSubmit = () => {
    push("/dashboard/despesas/criar");
  };
  const { GetExpenseVehicle, expenseVehicle, value } = useContext(
    ExpenseVehicleContext
  );
  const { selectedVehicleId } = useContext(VehicleContext);

  const [query, setQuery] = useState<string>("");

  const [modalEye, setModalEye] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedExpense, setSelectedExpense] =
    useState<ExpenseVehicleProps | null>(null);

  const [loading, setLoading] = useState(false); // Estado de loading para o useEffect
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limitPage, setLimitPage] = useState<number>(5);

  useEffect(() => {
    setLoading(true); // Inicia o estado de loading

    const cookies = parseCookies();
    const savedVehicleId = cookies["vehicle:selectedVehicleId"];
    GetExpenseVehicle(
      undefined,
      savedVehicleId,
      currentPage,
      limitPage,
      query
    ).finally(() => {
      setLoading(false); // Finaliza o estado de loading
    });
  }, [value, selectedVehicleId, currentPage, limitPage, query]);

  if (!expenseVehicle) {
    return <TableSkeleton />; // Mostra o skeleton enquanto carrega
  }

  if (query.length === 0 && expenseVehicle?.data.length === 0) {
    return (
      <div className="flex flex-col mt-3 rounded-lg items-center justify-center pb-5 ">
        <NotDataTable.Root>
          <NotDataTable.Body
            img={IconExpense}
            actionButton={handleSubmit}
            icon={Plus}
            title="Despesa"
          />
        </NotDataTable.Root>
      </div>
    );
  }

  const handleChangeLimitPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value); // Converte o valor para número
    setLimitPage(newLimit); // Atualiza o estado limitPage com o novo valor
  };

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

  const handleCloseModal = () => {
    setModalUpdate(false);
    setModalEye(false);
    setModalDelete(false);
  };

  const handleOpenModalEye = (item: ExpenseVehicleProps) => {
    setSelectedExpense(item);
    setModalEye(true);
  };

  const handleOpenModalDelete = (item: ExpenseVehicleProps) => {
    setSelectedExpense(item);
    setModalDelete(true);
  };

  const handleOpenModalUpdate = (item: ExpenseVehicleProps) => {
    setSelectedExpense(item);
    setModalUpdate(true);
  };

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  // Filter data after fetching
  const filteredExpenseVehicleData = expenseVehicle?.data.filter(
    (item) =>
      item.expense_type?.name.toLowerCase() !== "manutenção" &&
      item.expense_type?.name.toLowerCase() !== "abastecimento"
  );

  return (
    <>
      <ExpenseVehicleLayout
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
              <td className="py-3 hidden slg:table-cell">{index + 1}</td>
              <td className="slg:py-3">
                <span className="flex gap-2 slg:table-cell">
                  <Text width={17} height={17} className="slg:hidden" />
                  {item.description}
                </span>
              </td>
              <td className="slg:py-3 ">
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
                    onClick={() => handleOpenModalDelete(item)}
                  >
                    <Trash width={15} color="white" />
                  </button>
                </section>
                <span className="flex gap-2 slg:table-cell">
                  <CalendarDays width={17} height={17} className="slg:hidden" />
                  {formattedDate(new Date(item.date))}
                </span>
              </td>
              <td className="slg:py-3">
                <span className="flex gap-2 slg:table-cell">
                  <TrendingDown width={17} height={17} className="slg:hidden" />
                  {item.expense_type.name}
                </span>
              </td>
              <td className="flex slg:py-3 slg:table-cell">
                <span className="flex gap-2 slg:table-cell">
                  <Map width={17} height={17} className="slg:hidden" />

                  {formatKm(item.km)}
                </span>
              </td>
              <td className="slg:py-3 ">
                <span className="flex gap-2 slg:table-cell">
                  <BadgeDollarSign
                    width={17}
                    height={17}
                    className="slg:hidden"
                  />
                  R$ {formatNumberWithSpaces(item.amount)}
                </span>
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
                  onClick={() => handleOpenModalDelete(item)}
                >
                  <Trash width={15} color="white" />
                </button>
              </td>
            </tr>
          ))}
      </ExpenseVehicleLayout>

      {modalEye && selectedExpense && (
        <ExpenseVehicleSelf
          handleClose={handleCloseModal}
          item={{
            ...selectedExpense,
            amount: selectedExpense.amount.toString(),
            km: selectedExpense.km.toString(), // Converter km para string
          }}
        />
      )}

      {modalDelete && selectedExpense && (
        <ExpenseVehicleDelete
          expenseVehicleId={selectedExpense.id ?? ""}
          handleClose={handleCloseModal}
          item={{
            ...selectedExpense,
            amount: selectedExpense.amount.toString(),
            km: selectedExpense.km.toString(), // Converter km para string
          }}
        />
      )}

      {modalUpdate && selectedExpense && (
        <ExpenseVehicleUpdate
          expenseVehicleId={selectedExpense.id ?? ""}
          handleClose={handleCloseModal}
          item={{
            ...selectedExpense,
            amount: selectedExpense.amount.toString(),
            km: selectedExpense.km.toString(), // Converter km para string
          }}
        />
      )}
    </>
  );
}
