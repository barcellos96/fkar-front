"use client";

import { formatKm } from "@/hooks/km";
import { VehicleContext } from "@/providers/vehicle/vehicle";
import { CarFront, Map } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import HeaderContentSkeleton from "./skeleton";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { ExpenseVehicleContext } from "@/providers/expense/expenseVehicle";
import { UserContext } from "@/providers/user";
import { Modal } from "@/components/modals";
import ModalTitle from "@/components/modals/title";

export default function Content() {
  const { push } = useRouter();
  const {
    GetVehicle,
    vehicle,
    setModalCreateVehicle,
    value,
    setSelectedVehicleId,
  } = useContext(VehicleContext);
  const { ListAll } = useContext(ExpenseVehicleContext);
  const { Logout } = useContext(UserContext);

  const cookies = parseCookies();
  const userToken = cookies["user:accessToken"];
  const vehicleIdCookies = cookies["vehicle:selectedVehicleId"];

  const [vehicleId, setVehicleId] = useState<string>(vehicleIdCookies);
  const [plate, setPlate] = useState<string | null | undefined>("");
  const [km, setKm] = useState<number | null | undefined>(0);
  const [isMenuOpen, setMenuOpen] = useState(false); // Estado para controlar se o menu está aberto
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (vehicleId && vehicle?.length !== 0) {
      ListAll({ vehicleId: vehicleId });
    }
  }, [vehicleId]);

  useEffect(() => {
    if (userToken) {
      if (vehicle === null) {
        GetVehicle();
      }
    }
  }, [value, GetVehicle, userToken]);

  const handleCloseModal = () => setModalOpen(false);
  const handleOpenModal = () => setModalOpen(true);

  useEffect(() => {
    if (vehicle && vehicle.length === 0) {
      handleOpenModal();
    } else {
      handleCloseModal();
    }
  }, [vehicle, value]);

  useEffect(() => {
    if (!userToken) {
      Logout();
    }
  }, [userToken]);

  useEffect(() => {
    const cookies = parseCookies();
    const savedVehicleId = cookies["vehicle:selectedVehicleId"];
    const selectedVehicle = vehicle?.find((item) => item.id === vehicleId);
    if (savedVehicleId && selectedVehicle) {
      setVehicleId(savedVehicleId);
    } else {
      if (vehicle && vehicle.length > 0) {
        const oldestDate = vehicle.reduce((oldest, item) => {
          const currentCreatedAt = item.created_at
            ? new Date(item.created_at)
            : new Date();
          const oldestCreatedAt = oldest.created_at
            ? new Date(oldest.created_at)
            : new Date();
          return currentCreatedAt < oldestCreatedAt ? item : oldest;
        }, vehicle[0]);

        setVehicleId(oldestDate.id);
        setSelectedVehicleId(oldestDate.id);
        setCookie({}, "vehicle:selectedVehicleId", oldestDate.id, {
          path: "/",
          maxAge: 30 * 24 * 60 * 60,
        }); // Expira em 30 dias);
      }
    }
  }, [vehicle]);

  // useEffect to update cookies whenever vehicleId changes
  useEffect(() => {
    if (vehicleId) {
      setCookie({}, "vehicle:selectedVehicleId", vehicleId, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      });
      setSelectedVehicleId(vehicleId); //nao remover - caso remover nao irá alterar lista de dados do veiculo selecionado
    }
  }, [vehicleId]);

  useEffect(() => {
    if (vehicle && vehicle.length > 0) {
      const selectedVehicle = vehicle.find((item) => item.id === vehicleId);

      if (selectedVehicle) {
        setPlate(selectedVehicle.plate);
        setKm(selectedVehicle.km);
      }
    }
  }, [vehicle, vehicleId]);

  const handleOpenMenu = () => setMenuOpen(true);

  const handleCloseMenu = () => setMenuOpen(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    setVehicleId(selectedOption.value);

    setTimeout(() => {
      setMenuOpen(false);
    }, 50); // 100 milissegundos (ajuste conforme necessário)
  };

  return (
    <>
      {!vehicle ? (
        <HeaderContentSkeleton />
      ) : (
        <div className="relative">
          {/* Overlay semitransparente */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black opacity-15 z-40"
              onClick={handleCloseMenu} // Fechar o menu quando o overlay é clicado
            />
          )}

          <section className="flex text-base cursor-pointer border-b border-zinc-300 items-center px-1 py-1 rounded-lg outline-none">
            <CarFront size={22} />
            <select
              id="select-option"
              className="outline-none cursor-pointer p-1 bg-transparent max-w-32 sm:max-w-max"
              onChange={handleSelectChange}
              value={vehicleId}
              onClick={
                vehicle.length === 0
                  ? () => push("/dashboard/meus-veiculos")
                  : handleOpenMenu
              } // Abrir menu ao clicar no select ou direcionar para criar um veiculo
            >
              {vehicle.length === 0 ? (
                <option title={" Nenhum veiculo cadastrado"}>
                  {/* push("/dashboard/meus-veiculos") */}
                  Nenhum veiculo cadastrado
                </option>
              ) : (
                vehicle?.map((item, index) => (
                  <option
                    key={index}
                    value={item.id}
                    id={item.id}
                    title={item.title}
                    className="text-lg"
                  >
                    {item.title}
                  </option>
                ))
              )}
            </select>
          </section>
        </div>
      )}

      {isModalOpen && (
        <Modal.Root>
          <ModalTitle title="Cadastrar Veículo" />
          <div className="px-4">
            <p className="pb-3">
              Você ainda não possui nenhum veículo cadastrado. Por favor,
              cadastre seu primeiro veículo para continuar.
            </p>
            <button
              className="bg-green-700 mt-4 px-4 py-2 text-white rounded my-3"
              onClick={() => {
                push("/dashboard/meus-veiculos");
                setModalCreateVehicle(true);
              }}
            >
              Cadastrar Veículo
            </button>
          </div>
        </Modal.Root>
      )}
    </>
  );
}
