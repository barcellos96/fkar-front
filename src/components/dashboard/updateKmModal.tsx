"use client";

import { formatKm } from "@/hooks/km";
import { VehicleContext } from "@/providers/vehicle/vehicle";
import { VehicleTypeContext } from "@/providers/vehicle/vehicleType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Map } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Loading from "../loading";
import { Modal } from "../modals";

const UpdateKmModal = () => {
  const { vehicle, UpdateVehicle, selectedVehicleId, GetVehicle } =
    useContext(VehicleContext);

  const { GetVehicleType, vehicleType } = useContext(VehicleTypeContext);

  useEffect(() => {
    if (vehicleType === null) {
      GetVehicleType();
    }
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const findVehicleLogged = vehicle?.find(
    (item) => item.id === selectedVehicleId
  );

  const vehicleTypeCheck = vehicleType?.find(
    (item) => item.id === findVehicleLogged?.vehicle_type.id
  );

  const defaultValues = {
    vehicle_type_id: vehicleTypeCheck?.id ?? "",
    km: "",
    vehicleId: selectedVehicleId ?? "",
  };

  const schema = z.object({
    km: z.string(),
    vehicle_type_id: z.string(),
    vehicleId: z.string(),
  });

  type RegisterProps = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProps>({
    values: defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterProps> = async (value) => {
    setLoading(true);

    const { km, ...rest } = value;
    const formatedKm = km.split("." || ",").join("");
    const updateValue = { ...rest, km: Number(formatedKm) };

    try {
      await UpdateVehicle(updateValue);
      setLoading(false);
      setIsVisible(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onClose = () => {
    setIsVisible(false);
    localStorage.setItem("@ukm-modal", JSON.stringify(new Date().getTime()));
  };

  useEffect(() => {
    const modalShownTimestamp = localStorage.getItem("@ukm-modal");
    const now = new Date().getTime();

    // Verifica se o `vehicle` está definido antes de acessar `length`
    if (vehicle && vehicle.length === 0) {
      setIsVisible(false);
    } else if (
      vehicle &&
      vehicle.length !== 0 &&
      (!modalShownTimestamp ||
        now - JSON.parse(modalShownTimestamp) > 24 * 60 * 60 * 1000)
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [vehicle]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  if (!isVisible || vehicle?.length === 0) {
    return null;
  }

  return (
    <Modal.Root onClose={onClose} width="max-w-[400px]">
      <Modal.Title title="Bem-vindo!" borderColor="border-none -ms-2" />
      <Modal.Span
        fontWeight="text-lg"
        span="Mantenha o controle preciso da quilometragem do seu veículo. Atualizar
          regularmente ajuda a garantir um registro de manutenção adequado e
          facilita o planejamento de serviços futuros."
      />

      <span className="block">
        Última quilometragem registrada:{" "}
        <span className="font-semibold">
          {formatKm(Number(findVehicleLogged?.km))}
        </span>
      </span>

      <form action="form" onSubmit={handleSubmit(onSubmit)}>
        <section className="flex gap-2 items-center mb-4 border border-zinc-300 rounded-md px-2">
          <Map />
          <input
            type="number"
            placeholder="Insira a quilometragem atual"
            className="w-full px-1 py-3 focus:outline-none"
            {...register("km")}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/[,\.]/g, "");
            }}
          />
        </section>
        <section className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading && "cursor-wait"
            } px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-opacity-80 transition duration-200 ease-in-out`}
          >
            {loading ? <Loading /> : "Atualizar"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-zinc-500 rounded-lg hover:text-zinc-400 transition duration-200 ease-in-out"
          >
            Não Atualizar
          </button>
        </section>
      </form>
    </Modal.Root>
  );
};

export default UpdateKmModal;
