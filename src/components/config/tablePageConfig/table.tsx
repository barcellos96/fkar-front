"use client";

import { ElementType, FC, ReactNode, useContext, useState } from "react";
import { Car, Fuel, Plus, Wallet } from "lucide-react";
import { Modal } from "../../modals";
import { IncomingContext } from "@/providers/incoming";
import { VehicleContext } from "@/providers/vehicle";
import { ExpenseContext } from "@/providers/expense";
import { FuelContext } from "@/providers/fuel";
import { NotDataTable } from "@/components/tablesNotData";
import HeaderComposition from "@/components/header/headerComposition";

interface TableProps {
  title: string;
  children: ReactNode[];
}

export default function TablePageConfig({ title, children }: TableProps) {
  const { CreateIncomingType } = useContext(IncomingContext);
  const { CreateVehicleType } = useContext(VehicleContext);
  const { CreateExpenseType } = useContext(ExpenseContext);
  const { CreateFuelType } = useContext(FuelContext);

  const [onModal, setOnModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => setOnModal(false);
  const handleOpenModal = () => setOnModal(true);

  const [modalData, setModalData] = useState({
    name: "",
  });

  const handleSubmit = async () => {
    if (title === "Tipo de Receita") {
      setLoading(true);
      await CreateIncomingType({ incoming_type_name: modalData.name });
    } else if (title === "Tipo de Despesa") {
      setLoading(true);
      await CreateExpenseType({ name: modalData.name });
    } else if (title === "Tipo de Combustível") {
      setLoading(true);
      await CreateFuelType({ fuel_name: modalData.name });
    } else if (title === "Tipo de Veículo") {
      setLoading(true);
      await CreateVehicleType({ type: modalData.name });
    }
  };

  const Icon: FC<ElementType> = () => {
    const style = "w-4 h-4 text-green-700";

    if (title === "Tipo de Receita") {
      return <Wallet className={style} />;
    } else if (title === "Tipo de Despesa") {
      return <Wallet className={style} />;
    } else if (title === "Tipo de Combustível") {
      return <Fuel className={style} />;
    } else if (title === "Tipo de Veículo") {
      return <Car className={style} />;
    }
  };

  return (
    <div>
      <HeaderComposition
        handleSubmit={handleOpenModal}
        title={title}
        typeSubmit="button"
        nameButton={`Novo ${title}`}
      />
      {children.length === 0 ? (
        <div className="flex flex-col items-center justify-center pb-5">
          <NotDataTable.Root>
            <div className="flex items-center justify-between text-base uppercase font-bold bg-gray-50 w-full">
              <NotDataTable.Heade text="#" />
              <NotDataTable.Heade text="Nome" />
              <NotDataTable.Heade text="Ação" />
            </div>
            <NotDataTable.Body
              actionButton={handleOpenModal}
              icon={Plus}
              title={title}
            />
          </NotDataTable.Root>
        </div>
      ) : (
        <table className="w-full text-left">
          <thead className="text-base uppercase bg-gray-50">
            <tr>
              <th className="py-3">#</th>
              <th className="py-3">Nome</th>
              <th className="text-right py-3">Ação</th>
            </tr>
          </thead>

          <tbody className="font-light text-base">{children}</tbody>
        </table>
      )}

      {onModal && (
        <div className="fixed z-50 top-0 left-0 h-full w-full flex flex-col items-center justify-center bg-zinc-900 bg-opacity-50 ">
          <Modal.Root>
            <Modal.Title title={title} onClose={handleCloseModal} />
            <Modal.Input
              icon={Icon}
              type="text"
              id="incoming_type_name"
              value={modalData.name}
              onChange={(e) => setModalData({ name: e.target.value })}
            />
            <Modal.Actions
              onSubmitAction={() => {
                handleSubmit().finally(() => {
                  setLoading(false);
                  setModalData({ name: "" });
                });
              }}
              loading={loading}
              onCancelAction={() => {
                handleCloseModal();
                setModalData({ name: "" });
              }}
            />
          </Modal.Root>
        </div>
      )}
    </div>
  );
}
