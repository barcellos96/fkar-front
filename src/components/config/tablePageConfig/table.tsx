"use client";

import {
  ElementType,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Car, Fuel, Plus, Wallet, Wrench } from "lucide-react";
import { Modal } from "../../modals";
import { IncomingContext } from "@/providers/incoming";
import { VehicleTypeContext } from "@/providers/vehicle/vehicleType";
import { ExpenseTypeContext } from "@/providers/expense/expenseType";
import { FuelContext } from "@/providers/fuel";
import { NotDataTable } from "@/components/tablesNotData";
import HeaderComposition from "@/components/header/headerComposition";

import IconConfig from "../../../assets/config-add.png";
import { ExpenseServiceContext } from "@/providers/expense/expenseService";

interface TableProps {
  title: string;
  children: ReactNode[];
}

export default function TablePageConfig({ title, children }: TableProps) {
  const { CreateIncomingType } = useContext(IncomingContext);
  const { CreateVehicleType, GetVehicleType, vehicleType } =
    useContext(VehicleTypeContext);
  const { CreateExpenseType } = useContext(ExpenseTypeContext);
  const { CreateFuelType } = useContext(FuelContext);
  const { CreateExpenseService } = useContext(ExpenseServiceContext);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>(
    []
  );

  const [onModal, setOnModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vehicleType === null) {
      GetVehicleType();
    }
  }, []);

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
    } else if (title === "Tipo de Serviço") {
      await CreateExpenseService({
        name: modalData.name,
        vehicleTypeIds: selectedVehicleTypes,
      });
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
    } else if (title === "Tipo de Serviço") {
      return <Wrench className={style} />;
    }
  };

  const handleCheckboxChange = (type: string) => {
    setSelectedVehicleTypes((prevSelected) =>
      prevSelected.includes(type)
        ? prevSelected.filter((item) => item !== type)
        : [...prevSelected, type]
    );
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
            <NotDataTable.Body
              img={IconConfig}
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
              {title === "Tipo de Serviço" && <th>Tipo de veículos</th>}
              <th className="text-right py-3">Ação</th>
            </tr>
          </thead>

          <tbody className="font-light text-base">{children}</tbody>
        </table>
      )}

      {onModal && (
        <div className="fixed inset-0 z-50 top-0 left-0 h-full w-full flex flex-col items-center justify-center bg-zinc-900 bg-opacity-50">
          <Modal.Root onClose={handleCloseModal}>
            <Modal.Title title={title} onClose={handleCloseModal} />

            <div>
              {title === "Tipo de Serviço" && (
                <div>
                  <span className="flex font-semibold">
                    A qual tipo de veiculo pertence?*
                  </span>
                  <span className="flex mb-2 font-extralight text-sm">
                    *selecione ao menos 1 (ou cadastre mais em Tipo de Veiculos)
                  </span>
                </div>
              )}

              {title === "Tipo de Serviço" &&
                vehicleType?.map((item, index) => (
                  <section className="flex gap-1" key={index}>
                    <input
                      type="checkbox"
                      value={item.id}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                    <label>{item.type}</label>
                  </section>
                ))}
            </div>

            <Modal.Input
              icon={Icon}
              type="text"
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
