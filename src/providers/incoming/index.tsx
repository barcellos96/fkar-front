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

interface IIncomingData {
  incomingType?: GetIncomingTypeProps[] | null;
  GetIncomingType: () => void;
  CreateIncomingType(data: IIncomingTypeProps): Promise<ValueProps>;
  value?: ValueProps;
  DeleteIncomingType(id: string): Promise<DeleteIncomingProps>;
  UpdateIncomingType(
    id: string,
    data: IIncomingTypeProps
  ): Promise<IncomingTypeProps>;
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
  const [value, setValue] = useState();

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
        console.log("res ", res.data);
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

  return (
    <IncomingContext.Provider
      value={{
        incomingType,
        GetIncomingType,
        DeleteIncomingType,
        CreateIncomingType,
        UpdateIncomingType,
        value,
      }}
    >
      {children}
    </IncomingContext.Provider>
  );
};
