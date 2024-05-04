"use client";

import { api } from "@/service/api";
import { parseCookies } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

interface IVehicleTypeProps {
  type: string;
}

interface VehicleTypeProps extends IVehicleTypeProps {
  id: string;
}

interface DeleteVehicleTypeProps {
  message: string;
  vehicle_type: {
    id: string;
    type: string;
    user: {
      id: string;
      email: string;
    };
  };
}

interface IVehicleData {
  vehicleType?: VehicleTypeProps[] | null;
  GetVehicleType: () => void;
  CreateVehicleType(data: IVehicleTypeProps): Promise<VehicleTypeProps>;
  DeleteVehicleType(id: string): Promise<DeleteVehicleTypeProps>;
  UpdateVehicleType(
    vehicleTypeId: string,
    type: string
  ): Promise<IVehicleTypeProps>;
  value?: VehicleTypeProps;
}

interface ICihldrenReact {
  children: ReactNode;
}

export const VehicleContext = createContext<IVehicleData>({} as IVehicleData);

export const VehicleProvider = ({ children }: ICihldrenReact) => {
  const [vehicleType, setVehicleType] = useState<VehicleTypeProps[] | null>(
    null
  );
  const [value, setValue] = useState();

  const CreateVehicleType = async (
    data: IVehicleTypeProps
  ): Promise<VehicleTypeProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .post("/vehicle/type", data, config)
      .then((res) => {
        setValue(res.data);
        setVehicleType(null);
        toast.success("Tipo de veículo cadastrado com sucesso!", {
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);

        return err;
      });

    return response;
  };

  const GetVehicleType = async () => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .get("/Vehicle/type", config)
      .then((res) => {
        setVehicleType(res.data.response);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });
    return response;
  };

  const DeleteVehicleType = async (
    id: string
  ): Promise<DeleteVehicleTypeProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .delete(`/vehicle/type/${id}`, config)
      .then((res) => {
        console.log("res ", res.data);
        setVehicleType(null);
        setValue(res.data.response);
        toast.success(res.data.response.message, {
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });

    return response;
  };

  const UpdateVehicleType = async (
    vehicleTypeId: string,
    type: string
  ): Promise<IVehicleTypeProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .patch(`/vehicle/type`, { vehicleTypeId, type }, config)
      .then((res) => {
        setVehicleType(null);
        setValue(res.data);
        toast.success("Tipo de veículo atualizado!", { position: "top-right" });
      })
      .catch((err) => {
        toast.error(err.data.repsonse.message, { position: "top-right" });
        return err;
      });

    return response;
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicleType,
        GetVehicleType,
        CreateVehicleType,
        DeleteVehicleType,
        UpdateVehicleType,
        value,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
