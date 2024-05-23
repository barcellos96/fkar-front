"use client";

import { ExpenseTypeContext } from "@/providers/expense/expenseType";
import { Pencil, Trash, Wallet } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import TableSkeleton from "../../tablesNotData/skeleton";
import TablePageConfig from "../tablePageConfig/table";
import { Modal } from "@/components/modals";

interface Props {
  title: string;
}

interface ExpenseTypeProps {
  id: string;
  name: string;
  isProtected: boolean;
}

export default function TableTypeExpense({ title }: Props) {
  const {
    GetExpenseType,
    expenseType,
    value,
    DeleteExpenseType,
    UpdateExpenseType,
  } = useContext(ExpenseTypeContext);

  const [onModal, setOnModal] = useState(false);
  const [onModalUpdate, setOnModalUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedExpenseType, setSelectedExpenseType] =
    useState<ExpenseTypeProps | null>(null);

  const [modalData, setModalData] = useState({
    name: "",
  });

  const handleCloseModal = () => {
    setOnModal(false);
    setOnModalUpdate(false);
  };

  const handleOpenModal = (item: ExpenseTypeProps) => {
    setModalData({ name: item.name });
    setSelectedExpenseType(item);
    setOnModal(true);
  };

  useEffect(() => {
    if (expenseType === null) {
      const fetchData = async () => {
        GetExpenseType();
      };

      fetchData();
    }
  }, [value]);

  const typeModal = onModalUpdate ? "Atualizar " : "Deletar ";
  const colorModal = onModalUpdate ? "bg-yellow-600" : "bg-red-700";

  const handleSubmit = () => {
    if (selectedExpenseType) {
      onModalUpdate
        ? UpdateExpenseType({
            expense_type_id: selectedExpenseType.id,
            name: modalData.name,
          }).finally(() => {
            setLoading(false);
            handleCloseModal();
          })
        : DeleteExpenseType(selectedExpenseType.id).finally(() => {
            setLoading(false);
            handleCloseModal();
          });
    }
  };

  return (
    <div>
      {!expenseType ? (
        <TableSkeleton />
      ) : (
        <TablePageConfig title={title}>
          {expenseType?.map((item, index) => (
            <tr className="border-b" key={index}>
              <th className="font-normal py-5">{index + 1}</th>
              <th className="font-normal">{item.name}</th>
              <th className="flex justify-end py-5 gap-3">
                <button
                  disabled={item.isProtected}
                  onClick={() => {
                    setOnModalUpdate(true);
                    handleOpenModal(item);
                  }}
                  className={`bg-green-600 ${
                    item.isProtected && `bg-opacity-60 cursor-not-allowed`
                  } flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 ${
                    !item.isProtected && `cursor-pointer`
                  }`}
                >
                  <Pencil width={15} color="white" />
                </button>
                <button
                  disabled={item.isProtected}
                  onClick={() => {
                    handleOpenModal(item);
                  }}
                  className={`bg-green-600 ${
                    item.isProtected && `bg-opacity-60 cursor-not-allowed`
                  } flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 ${
                    !item.isProtected && `cursor-pointer`
                  }`}
                >
                  <Trash width={15} color="white" />
                </button>
                {onModal && selectedExpenseType === item && (
                  <div className="fixed inset-0 z-50 top-0 left-0 h-full w-full flex flex-col items-center justify-center bg-zinc-900 bg-opacity-50">
                    <Modal.Root onClose={handleCloseModal}>
                      <Modal.Title
                        title={typeModal + title}
                        onClose={handleCloseModal}
                      />
                      {onModalUpdate ? (
                        <div className="flex flex-col gap-2 font-normal my-3">
                          <span className="text-lg font-semibold">
                            {title}:
                          </span>
                          <Modal.Input
                            icon={Wallet}
                            type="text"
                            id="expense_type_name"
                            value={modalData.name}
                            onChange={(e) =>
                              setModalData({
                                name: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                setLoading(true);
                                handleSubmit();
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <span className="my-5 font-light text-lg">
                          {selectedExpenseType.name}
                        </span>
                      )}
                      <Modal.Actions
                        onSubmitAction={() => {
                          setLoading(true);
                          handleSubmit();
                        }}
                        nameButtonSubmit={typeModal}
                        bgColorSubmit={colorModal}
                        loading={loading}
                        onCancelAction={handleCloseModal}
                      />
                    </Modal.Root>
                  </div>
                )}
              </th>
            </tr>
          ))}
        </TablePageConfig>
      )}
    </div>
  );
}
