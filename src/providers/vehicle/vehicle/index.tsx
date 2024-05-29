"use client";

import { api } from "@/service/api";
import { parseCookies } from "nookies";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { toast } from "sonner";

interface VehicleCreateProps {
  vehicle_type_id: string;
  title: string;
  brand: string;
  model: string;
  plate?: string | null;
  km?: number | null;
  year: number;
  created_at?: Date; // Make optional
  updated_at?: Date; // Make optional
}

interface PromiseVehicleProps extends VehicleCreateProps {
  vehicle_type: { id: string; type: string };
  user: string;
  id: string;
  isPrivate: boolean;
  isActive: boolean;
}

interface PromiseVehicleDeleteProps extends PromiseVehicleProps {
  message: string;
}

interface VehicleUpdateProps {
  vehicle_type_id: string;
  title?: string;
  brand?: string;
  model?: string;
  plate?: string;
  km?: number;
  year?: number;
  vehicleId?: string;
}

interface IVehicleData {
  CreateVehicle(data: VehicleCreateProps): Promise<PromiseVehicleProps>;
  GetVehicle(
    vehicleId?: string | ""
  ): Promise<PromiseVehicleProps | PromiseVehicleProps[]>;
  DeleteVehicle(vehicleId: string): Promise<PromiseVehicleDeleteProps>;
  UpdateVehicle(data: VehicleUpdateProps): Promise<object>;

  vehicle?: PromiseVehicleProps[] | null;
  value?: PromiseVehicleProps;

  setSelectedVehicleId: Dispatch<SetStateAction<string>>;
  selectedVehicleId: string;
}

interface ICihldrenReact {
  children: ReactNode;
}

export const VehicleContext = createContext<IVehicleData>({} as IVehicleData);

export const VehicleProvider = ({ children }: ICihldrenReact) => {
  const [vehicle, setVehicle] = useState<PromiseVehicleProps[] | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");
  const [value, setValue] = useState();

  const CreateVehicle = async (
    data: VehicleCreateProps
  ): Promise<PromiseVehicleProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .post("/user/vehicle", data, config)
      .then((res) => {
        setVehicle(null);
        setValue(res.data);
        toast.success("Veiculo Criado com sucesso!", { position: "top-right" });
        //adicionar modal ao finalizar criação do carro perguntando se deseja colocar mais detalhes
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });

    return response;
  };

  const GetVehicle = async (
    vehicleId?: string | ""
  ): Promise<PromiseVehicleProps | PromiseVehicleProps[]> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .get(`/user/vehicle/${vehicleId ? vehicleId : ""}`, config)
      .then((res) => {
        setVehicle(res.data.response);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });

    return response;
  };

  const DeleteVehicle = async (
    vehicleId: string
  ): Promise<PromiseVehicleDeleteProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .delete(`/user/vehicle/${vehicleId}`, config)
      .then((res) => {
        setVehicle(null);
        setValue(res.data);
        toast.success("Veículo deletado com sucesso", {
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });

    return response;
  };

  const UpdateVehicle = async (data: VehicleUpdateProps): Promise<object> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    const response = await api
      .patch(`/user/vehicle`, data, config)
      .then((res) => {
        setVehicle(null);
        setValue(res.data);
        toast.success("Veículo atualizado com sucesso!", {
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "top-right" });
        return err;
      });

    return response;
  };

  return (
    <VehicleContext.Provider
      value={{
        CreateVehicle,
        GetVehicle,
        DeleteVehicle,
        UpdateVehicle,
        setSelectedVehicleId,
        selectedVehicleId,
        value,
        vehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
