"use client";

import { api } from "@/service/api";
import { parseCookies } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

interface ExpenseServiceCreateProps {
  name: string;
  vehicleTypeIds: string[];
}

interface ExpenseServiceUpdateProps {
  expenseServiceId: string;
  name?: string;
  vehicleTypeIds?: string[];
}

interface ExpenseServiceGetProps {
  id: string;
  name: string;
  vehicle_types: {
    id: string;
    type: string;
  }[];
}

interface IExpenseData {
  expenseService: ExpenseServiceGetProps[] | null;
  GetExpenseService(): Promise<ExpenseServiceGetProps[]>;
  CreateExpenseService(
    data: ExpenseServiceCreateProps
  ): Promise<ExpenseServiceGetProps>;
  value: ExpenseServiceGetProps | undefined;
  UpdateExpenseService(
    data: ExpenseServiceUpdateProps
  ): Promise<ExpenseServiceGetProps>;
  DeleteExpenseService(expenseServiceId: string): Promise<void>;
}

interface ICihldrenReact {
  children: ReactNode;
}

export const ExpenseServiceContext = createContext<IExpenseData>(
  {} as IExpenseData
);

export const ExpenseServiceProvider = ({ children }: ICihldrenReact) => {
  const [value, setValue] = useState();
  const [expenseService, setExpenseService] = useState<
    ExpenseServiceGetProps[] | null
  >(null);

  const GetExpenseService = async () => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = api
      .get("/expense/service", config)
      .then((res) => {
        setExpenseService(res.data.response);
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "top-right" });
        return err;
      });

    return response;
  };

  const CreateExpenseService = async (
    data: ExpenseServiceCreateProps
  ): Promise<ExpenseServiceGetProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .post("/expense/service", data, config)
      .then((res) => {
        setValue(res.data.response);
        setExpenseService(null);
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "top-right" });
        return err;
      });

    return response;
  };

  const UpdateExpenseService = async (
    data: ExpenseServiceUpdateProps
  ): Promise<ExpenseServiceGetProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .patch("/expense/service", data, config)
      .then((res) => {
        setValue(res.data);
        setExpenseService(null);
        toast.warning("Tipo de serviço atualizado com sucesso", {
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "top-right" });
        return err;
      });

    return response;
  };

  const DeleteExpenseService = async (expenseServiceId: string) => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .delete(`/expense/service/${expenseServiceId}`, config)
      .then((res) => {
        setValue(res.data);
        setExpenseService(null);
        toast.success("Tipo de serviço deletado!", {
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
    <ExpenseServiceContext.Provider
      value={{
        DeleteExpenseService,
        GetExpenseService,
        expenseService,
        CreateExpenseService,
        value,
        UpdateExpenseService,
      }}
    >
      {children}
    </ExpenseServiceContext.Provider>
  );
};
