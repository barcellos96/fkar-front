"use client";

import { api } from "@/service/api";
import { parseCookies } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

interface IFuelProps {
  fuel_name: string;
}

interface FuelTypeProps extends IFuelProps {
  id: string;
  user: {
    id: string;
    email: string;
    isActive: string;
  };
}

interface DeleteFuelProps {
  message: string;
  fuel_delete: {
    id: string;
    fuel_name: string;
  };
}

interface IFuelData {
  fuelType?: FuelTypeProps[] | null;
  GetFuelType: () => void;
  CreateFuelType(data: IFuelProps): Promise<FuelTypeProps>;
  DeleteFuelType(id: string): Promise<DeleteFuelProps>;
  UpdateFuelType(id: string, fuel_name: string): Promise<IFuelProps>;
  value?: FuelTypeProps;
}

interface ICihldrenReact {
  children: ReactNode;
}

export const FuelContext = createContext<IFuelData>({} as IFuelData);

export const FuelProvider = ({ children }: ICihldrenReact) => {
  const [fuelType, setFuelType] = useState<FuelTypeProps[] | null>(null);
  const [value, setValue] = useState();

  const CreateFuelType = async (data: IFuelProps): Promise<FuelTypeProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .post("/fuel", data, config)
      .then((res) => {
        setFuelType(null);
        setValue(res.data);
        toast.success("Tipo de combustivel cadastro!", {
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });

    return response;
  };

  const GetFuelType = async () => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .get("/fuel", config)
      .then((res) => {
        setFuelType(res.data.response);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });
    return response;
  };

  const DeleteFuelType = async (id: string): Promise<DeleteFuelProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .delete(`/fuel/${id}`, config)
      .then((res) => {
        setFuelType(null);
        setValue(res.data);
        toast.success(res.data.response.message, { position: "top-right" });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });

    return response;
  };

  const UpdateFuelType = async (
    id: string,
    fuel_name: string
  ): Promise<IFuelProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .patch(`/fuel/${id}`, { fuel_name }, config)
      .then((res) => {
        setFuelType(null);
        setValue(res.data);
        toast.success("Tipo de Combustível atualizado", {
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error(err.data.response.message);
        return err;
      });

    return response;
  };

  return (
    <FuelContext.Provider
      value={{
        fuelType,
        GetFuelType,
        CreateFuelType,
        DeleteFuelType,
        UpdateFuelType,
        value,
      }}
    >
      {children}
    </FuelContext.Provider>
  );
};
