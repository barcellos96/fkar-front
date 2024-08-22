"use client";

import { formatKm } from "@/hooks/km";
import { VehicleContext } from "@/providers/vehicle/vehicle";
import { useContext, useEffect, useState } from "react";

export default function LastRegisterKm() {
  const { GetVehicle, selectedVehicleId, vehicle } = useContext(VehicleContext);
  const [km, setKm] = useState<number | null>(null);

  useEffect(() => {
    GetVehicle();
  }, []);

  useEffect(() => {
    const findVehicle = vehicle?.find((item) => item.id === selectedVehicleId);
    setKm(findVehicle?.km ?? 0); // Define 0 como valor padrão se findVehicle for undefined ou findVehicle.km for undefined
  }, [vehicle, selectedVehicleId]);

  return (
    <span className="font-semibold">
      {km ? formatKm(km) : "N/A"} {/* Exibe "N/A" se km for 0 */}
    </span>
  );
}
