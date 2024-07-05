"use client";

import { Pencil, Trash, Wallet } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import TableSkeleton from "../../tablesNotData/skeleton";
import TablePageConfig from "../tablePageConfig/table";
import { IncomingContext } from "@/providers/incoming";
import { Modal } from "@/components/modals";

interface Props {
  title: string;
}

interface IncomingTypeProps {
  id: string;
  name: string;
}

export default function TableIncomingType({ title }: Props) {
  const {
    GetIncomingType,
    incomingType,
    valueIncoming,
    DeleteIncomingType,
    UpdateIncomingType,
  } = useContext(IncomingContext);

  const [onModal, setOnModal] = useState(false);
  const [onModalUpdate, setOnModalUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedIncomingType, setSelectedIncomingType] =
    useState<IncomingTypeProps | null>(null);

  const [modalData, setModalData] = useState({
    name: "",
  });

  const handleCloseModal = () => {
    setOnModal(false);
    setOnModalUpdate(false);
  };
  const handleOpenModal = (item: IncomingTypeProps) => {
    setModalData({ name: item.name }); // Atualizando modalData.name quando o modal é aberto
    setSelectedIncomingType(item);
    setOnModal(true);
  };

  useEffect(() => {
    if (incomingType === null) {
      const fetchData = async () => {
        GetIncomingType();
      };

      fetchData();
    }
  }, [valueIncoming]);

  const typeModal = onModalUpdate ? "Atualizar " : "Excluir ";
  const colorModal = onModalUpdate ? "bg-yellow-600" : "bg-red-700";

  const handleSubmit = () => {
    if (selectedIncomingType) {
      onModalUpdate
        ? UpdateIncomingType(selectedIncomingType.id, {
            incoming_type_name: modalData.name,
          }).finally(() => {
            setLoading(false);
            handleCloseModal();
          })
        : DeleteIncomingType(selectedIncomingType.id).finally(() => {
            setLoading(false);
            handleCloseModal();
          });
    }
  };

  return (
    <div>
      {!incomingType ? (
        <TableSkeleton />
      ) : (
        <TablePageConfig title={title}>
          {incomingType?.map((item, index) => (
            <tr className="border-b" key={index}>
              <th className="font-normal py-5">{index + 1}</th>
              <th className="font-normal">{item.name}</th>
              <th className="flex justify-end py-5 gap-3">
                <button
                  onClick={() => {
                    setOnModalUpdate(true);
                    handleOpenModal(item);
                  }}
                  className={`bg-green-600 } flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                >
                  <Pencil width={15} color="white" />
                </button>
                <button
                  onClick={() => handleOpenModal(item)}
                  className={`bg-green-600 } flex items-center justify-center rounded-full h-7 w-7 hover:bg-opacity-60 `}
                >
                  <Trash width={15} color="white" />
                </button>
                {onModal && selectedIncomingType === item && (
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
                            id="incoming_type_name"
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
                          {selectedIncomingType.name}
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
