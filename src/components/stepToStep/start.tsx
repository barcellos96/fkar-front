"use cliente";

import { UserContext } from "@/providers/user";
import StartHistoric from "../../assets/start-historic.png";
import { useContext, useEffect, useState } from "react";
import { CheckCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { VehicleContext } from "@/providers/vehicle/vehicle";
import { AddressContext } from "@/providers/address";
import { ExpenseVehicleContext } from "@/providers/expense/expenseVehicle";
import { Modal } from "../modals";

export default function StartStep() {
  const { user } = useContext(UserContext);
  const { vehicle, setModalCreateVehicle } = useContext(VehicleContext);
  const { GetAddress, address } = useContext(AddressContext);
  const { listAll } = useContext(ExpenseVehicleContext);

  const [modalWarningVehicle, setModalWarningVehicle] = useState(false);

  const { push } = useRouter();

  useEffect(() => {
    GetAddress();
  }, []);

  const handleModalWarningVehicle = () =>
    setModalWarningVehicle((prev) => !prev);

  return (
    <div className="flex items-center flex-col">
      <section className="flex flex-col md:flex md:flex-row gap-2 items-center md:items-end w-full">
        <img src={StartHistoric.src} width={80} alt="imagem cadastros" />
        <h2 className="text-center text-3xl font-semibold text-zinc-600">
          Pronto para começar?
        </h2>
      </section>
      <ol className="flex  flex-col mt-6 w-full gap-2">
        <li
          className={`rounded-md border border-green-300 px-3 py-4 hover:bg-green-300  hover:text-white font-semibold ${
            user?.tour !== "starting"
              ? "bg-green-300 text-white cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <button
            disabled={user?.tour !== "starting"}
            className={`flex justify-between w-full ${
              user?.tour !== "starting" && "font-semibold cursor-not-allowed"
            }`}
          >
            Fazer Tour Inicial
            <span>{user?.tour !== "starting" ? <CheckCheck /> : "1 / 4"}</span>
          </button>
        </li>
        <li
          onClick={() => {
            if (vehicle?.length === 0) {
              push("/dashboard/meus-veiculos");
              setModalCreateVehicle(true);
            }
          }}
          className={`rounded-md border border-green-400 px-3 py-4 hover:bg-green-400  hover:text-white font-semibold ${
            vehicle !== null && vehicle?.length !== 0
              ? "bg-green-400 text-white cursor-not-allowed "
              : "cursor-pointer"
          }`}
        >
          <button
            disabled={vehicle !== null && vehicle?.length !== 0}
            className={`flex justify-between w-full ${
              vehicle !== null &&
              vehicle?.length !== 0 &&
              "cursor-not-allowed f"
            }`}
          >
            Adicionar Veículo{" "}
            <span>
              {vehicle !== null && vehicle?.length !== 0 ? (
                <CheckCheck />
              ) : (
                "2 / 4"
              )}
            </span>
          </button>
        </li>
        <li
          onClick={() => address === null && push("/dashboard/perfil")}
          className={`rounded-md border border-green-500 px-3 py-4 hover:bg-green-500 cursor-pointer hover:text-white font-semibold ${
            address !== null
              ? "bg-green-500 text-white cursor-not-allowed "
              : "cursor-pointer"
          }`}
        >
          <button
            disabled={address !== null}
            className="flex justify-between w-full "
          >
            Adicionar Meu endereço{" "}
            <span>{address !== null ? <CheckCheck /> : "3 / 4"}</span>
          </button>
        </li>
        <li
          onClick={() => {
            if (vehicle?.length !== 0) {
              listAll?.list.length === 0 &&
                push("/dashboard/abastecimento/criar");
            } else {
              handleModalWarningVehicle();
            }
          }}
          className={`rounded-md border border-green-400 px-3 py-4 hover:bg-green-600 cursor-pointer hover:text-white font-semibold`}
        >
          <button
            disabled={listAll !== null && listAll?.list.length !== 0}
            className="flex justify-between w-full cursor-pointer"
          >
            Adicionar Primeiro Abastecimento
            <span>
              {listAll !== null && listAll?.list.length !== 0 ? (
                <CheckCheck />
              ) : (
                "4 / 4"
              )}
            </span>
          </button>
        </li>
      </ol>

      {modalWarningVehicle && (
        <Modal.Root>
          <Modal.Title title="Nenhum Veículo Adicionado" />
          <Modal.Span span="Para começar a utilizar todos os recursos do sistema, você precisa adicionar um veículo. Sem um veículo registrado, não será possível acompanhar seus abastecimentos, manutenções ou outros dados importantes relacionados ao seu veículo. Adicione um veículo agora para garantir que você tenha todas as informações organizadas e acessíveis." />
          <Modal.Actions
            onSubmitAction={() => {
              push("/dashboard/meus-veiculos");
              setModalCreateVehicle(true);
            }}
            nameButtonSubmit="Adicionar Veículo"
            onCancelAction={handleModalWarningVehicle}
          />
        </Modal.Root>
      )}
    </div>
  );
}
