"use client";

import { api } from "@/service/api";
import { parseCookies } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

interface ValueProps {
  id: string;
  name: string;
  user: {
    id: string;
    email: string;
    isActive: boolean;
  };
}

interface IncomingTypeProps {
  name: string;
}

interface GetIncomingTypeProps extends IncomingTypeProps {
  id: string;
}

interface IIncomingTypeProps {
  incoming_type_name: string;
}

interface DeleteIncomingProps {
  message: string;
  incoming_type_delete: {
    id: string;
    name: string;
  };
}

export interface VehicleProps {
  brand: string;
  id: string;
  isActive: boolean;
  isPrivate: boolean;
  km: number;
  model: string;
  plate: string;
  title: string;
  created_at: string;
  updated_at: string;
  year: number;
}

export interface GetIncomingProps {
  incoming_list: {
    id: string;
    date: string;
    title: string;
    amount_received: string;
    km: number;
    observation: string;
    incoming_type: {
      id: string;
      name: string;
    };
    vehicle: VehicleProps;
  }[];
  total: number;
  page: number;
  limit: number;
}

interface IncomingCreateProps {
  id?: string;
  date: string;
  title: string;
  amount_received: number;
  km: number;
  observation?: string | null;
  incomingTypeId: string;
  vehicleId: string;
}

interface IncomingUpdateProps {
  id?: string;
  date?: string;
  title?: string;
  amount_received?: number;
  km?: number;
  observation?: string | null;
  incomingTypeId?: string;
  vehicleId?: string;
}

interface IncomingDeleteProps {
  message: string;
  incoming_delete: {
    id: string;
    date: string;
    amount_received: string;
    km: number;
    observation: string;
  };
}

interface ResponseCreateProps {
  response: {
    date: string;
    title: string;
    amount_received: number;
    km: number;
    observation: string;
    incoming_type: {
      id: string;
      name: string;
    };
    user: {
      id: string;
      isActive: boolean;
    };
    vehicle: {
      id: string;
      isActive: boolean;
    };
    id: string;
  };
}

interface IIncomingData {
  incomingType?: GetIncomingTypeProps[] | null;
  GetIncomingType: () => Promise<void>;
  CreateIncomingType(data: IIncomingTypeProps): Promise<ValueProps>;
  valueIncoming?: ValueProps;
  DeleteIncomingType(id: string): Promise<DeleteIncomingProps>;
  UpdateIncomingType(
    id: string,
    data: IIncomingTypeProps
  ): Promise<IncomingTypeProps>;

  GetIncoming(
    vehicleId: string,
    page?: string,
    limit?: string,
    incomingId?: string
  ): Promise<GetIncomingProps>;
  incomingData?: GetIncomingProps | null;
  CreateIncoming(data: IncomingCreateProps): Promise<ResponseCreateProps>;
  DeleteIncoming(incomingId: string): Promise<IncomingDeleteProps>;
  UpdateIncoming(
    incomingId: string,
    data: IncomingUpdateProps
  ): Promise<object>;
}

interface ICihldrenReact {
  children: ReactNode;
}

export const IncomingContext = createContext<IIncomingData>(
  {} as IIncomingData
);

export const IncomingProvider = ({ children }: ICihldrenReact) => {
  const [incomingType, setIncomingType] = useState<
    GetIncomingTypeProps[] | null
  >(null);
  const [valueIncoming, setValue] = useState();

  const CreateIncomingType = async (
    data: IIncomingTypeProps
  ): Promise<ValueProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .post("/incoming-type", data, config)
      .then((res) => {
        setIncomingType(null);
        setValue(res.data);
        toast.success("Tipo de receita cadastrado", {
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });
    return response;
  };

  const GetIncomingType = async () => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .get("/incoming-type", config)
      .then((res) => {
        setIncomingType(res.data.response);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });
    return response;
  };

  const DeleteIncomingType = async (
    id: string
  ): Promise<DeleteIncomingProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .delete(`/incoming-type/${id}`, config)
      .then((res) => {
        setIncomingType(null);
        setValue(res.data);
        toast.success(res.data.response.message, { position: "top-right" });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });

    return response;
  };

  const UpdateIncomingType = async (
    id: string,
    data: IIncomingTypeProps
  ): Promise<IncomingTypeProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .patch(`/incoming-type/${id}`, data, config)
      .then((res) => {
        setIncomingType(null);
        setValue(res.data);
        toast.success("Tipo de Receita atualizado!", { position: "top-right" });
      })
      .catch((err) => {
        return err;
      });

    return response;
  };

  const [incomingData, setIncomingData] = useState<GetIncomingProps | null>(
    null
  );

  const GetIncoming = async (
    vehicleId: string,
    page: string,
    limit: string, // Defina um limite padrão para o número de resultados por página
    incomingId?: string
  ): Promise<GetIncomingProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
      params: { page, limit, vehicleId }, // Adicione os parâmetros de consulta aqui
    };

    const response = await api
      .get(`/incoming/${incomingId ? incomingId : ""}`, config)
      .then((res) => {
        setIncomingData(res.data.response);
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "top-right" });
        return err;
      });

    return response;
  };

  const CreateIncoming = async (
    data: IncomingCreateProps
  ): Promise<ResponseCreateProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    const response = await api
      .post("/incoming", data, config)
      .then((res) => {
        toast.success("Receita criada com sucesso!", { position: "top-right" });
        setValue(res.data);
        setIncomingData(null);
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "top-right" });
        return err;
      });

    return response;
  };

  const DeleteIncoming = async (incomingId: string) => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    const response = await api
      .delete(`/incoming/${incomingId}`, config)
      .then((res) => {
        toast.success(res.data.response.message, { position: "top-right" });
        setValue(res.data);
        setIncomingData(null);
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "top-right" });
        return err;
      });

    return response;
  };

  const UpdateIncoming = async (
    incomingId: string,
    data: IncomingUpdateProps
  ) => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .patch(`/incoming/${incomingId}`, data, config)
      .then((res) => {
        toast.success(`Receita atualizada!`, { position: "top-right" });
        setValue(res.data);
        setIncomingData(null);
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "top-right" });
        return err;
      });

    return response;
  };

  return (
    <IncomingContext.Provider
      value={{
        incomingType,
        GetIncomingType,
        DeleteIncomingType,
        CreateIncomingType,
        UpdateIncomingType,
        valueIncoming,
        GetIncoming,
        incomingData,
        CreateIncoming,
        DeleteIncoming,
        UpdateIncoming,
      }}
    >
      {children}
    </IncomingContext.Provider>
  );
};
