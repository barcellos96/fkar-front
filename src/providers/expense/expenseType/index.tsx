"use client";

import { api } from "@/service/api";
import { parseCookies } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

interface IExpenseTypeProps {
  name: string;
}

interface UpdateExpenseTypeProps extends IExpenseTypeProps {
  expense_type_id: string;
}

interface ExpenseTypeProps extends IExpenseTypeProps {
  id: string;
  isProtected: boolean;
}

interface DeleteExpenseTypeProps {
  message: string;
  expense_type: {
    id: string;
    name: string;
    isProtected: boolean;
    user: {
      id: string;
      isActive: string;
    };
  };
}

interface IExpenseData {
  expenseType?: ExpenseTypeProps[] | null;
  GetExpenseType: () => void;
  CreateExpenseType(data: IExpenseTypeProps): Promise<ExpenseTypeProps>;
  value?: ExpenseTypeProps;
  DeleteExpenseType(id: string): Promise<DeleteExpenseTypeProps>;
  UpdateExpenseType(data: UpdateExpenseTypeProps): Promise<IExpenseTypeProps>;
}

interface ICihldrenReact {
  children: ReactNode;
}

export const ExpenseTypeContext = createContext<IExpenseData>(
  {} as IExpenseData
);

export const ExpenseTypeProvider = ({ children }: ICihldrenReact) => {
  const [expenseType, setExpenseType] = useState<ExpenseTypeProps[] | null>(
    null
  );
  const [value, setValue] = useState();

  const CreateExpenseType = async (
    data: IExpenseTypeProps
  ): Promise<ExpenseTypeProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .post("/expense/type", data, config)
      .then((res) => {
        setExpenseType(null);
        setValue(res.data);
        toast.success("Tipo de despesa cadastrado!", {
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });

    return response;
  };

  const GetExpenseType = async () => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .get("/expense/type", config)
      .then((res) => {
        setExpenseType(res.data.response);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });
    return response;
  };

  const DeleteExpenseType = async (
    id: string
  ): Promise<DeleteExpenseTypeProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .delete(`/expense/type/${id}`, config)
      .then((res) => {
        setExpenseType(null);
        setValue(res.data.response);
        toast.success(res.data.response.message, {
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
        });
        return err;
      });

    return response;
  };

  const UpdateExpenseType = async (
    data: UpdateExpenseTypeProps
  ): Promise<IExpenseTypeProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .patch(`/expense/type`, data, config)
      .then((res) => {
        setExpenseType(null);
        setValue(res.data);
        toast.warning("Tipo de Despesa atualizada!", { position: "top-right" });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
        });
        return err;
      });

    return response;
  };

  return (
    <ExpenseTypeContext.Provider
      value={{
        expenseType,
        GetExpenseType,
        CreateExpenseType,
        DeleteExpenseType,
        UpdateExpenseType,
        value,
      }}
    >
      {children}
    </ExpenseTypeContext.Provider>
  );
};
