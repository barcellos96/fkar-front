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

const WelcomeModal = () => {
  const { vehicle, UpdateVehicle, selectedVehicleId } =
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
    localStorage.setItem("welcomeModal", JSON.stringify(new Date().getTime()));
  };

  useEffect(() => {
    const modalShownTimestamp = localStorage.getItem("welcomeModal");
    const now = new Date().getTime();

    if (
      !modalShownTimestamp ||
      now - JSON.parse(modalShownTimestamp) > 24 * 60 * 60 * 1000
    ) {
      setIsVisible(true);
    }
  }, []);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-1">Bem-vindo!</h2>
        <p className="font-extralight">Atualizar Quilometragem do Veículo?</p>

        <span>
          Última quilometragem:{" "}
          <span>{formatKm(Number(findVehicleLogged?.km))}</span>
        </span>

        <form action="form" onSubmit={handleSubmit(onSubmit)}>
          <section className="flex gap-2 items-center mt-6">
            <Map />
            <input
              type="number"
              step="1"
              placeholder="Quilometragem atual"
              className="border border-zinc-100 py-2 px-2 rounded-md"
              {...register("km")}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.value = target.value.replace(/[,\.]/g, "");
              }}
            />
          </section>
          <section className="flex gap-6">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading && "cursor-wait"
              } mt-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-opacity-70`}
            >
              {loading ? <Loading /> : "Atualizar"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-4  text-zinc-400 rounded-lg hover:border hover:border-zinc-400 hover:shadow-md"
            >
              Não Atualizar
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default WelcomeModal;
