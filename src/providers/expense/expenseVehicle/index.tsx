"use client";

import { api } from "@/service/api";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  isActive: boolean;
}

interface Vehicle {
  id: string;
  brand: string;
}

interface ExpenseType {
  id: string;
  name: string;
}

interface ExpenseVehicleServicesProps {
  id: string;
  value: number;
  expense_service: {
    id: string;
    name: string;
  };
}

interface CreateExpenseVehicle {
  date: string;
  description: string;
  expense_type_id: string;
  expense_vehicle_services?: ExpenseVehicleServicesProps[]; // Adjust if you have a specific type for services
  amount: number;
  fuel_type?: string | null;
  fuel_liters?: string | null;
  price_liters?: string | null;
  km: number;
  location?: string | null;
  method_payment?: string | null;
  status_payment?: boolean;
  observation?: string | null;
  vehicleId: string;
}

interface ExpenseVehicle {
  data: {
    id?: string;
    date: string;
    description: string;
    amount: number;
    fuel_type?: string | null;
    fuel_liters?: number | null;
    price_liters?: number | null;
    km: number;
    location: string;
    method_payment?: string | null;
    status_payment?: boolean;
    observation?: string | null;
    user: User;
    vehicle: Vehicle;
    expense_type: ExpenseType;
    expense_vehicle_services?: ExpenseVehicleServicesProps[]; // Adjust if you have a specific type for services
  }[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface IExpenseData {
  expenseVehicle?: ExpenseVehicle | null;
  GetExpenseVehicle: (
    expenseTypeId?: string,
    vehicleId?: string,
    page?: number,
    limite?: number
  ) => Promise<ExpenseVehicle[]>;
  value?: any;

  CreateExpenseVehicle(data: CreateExpenseVehicle): Promise<object>;
}

interface ICihldrenReact {
  children: ReactNode;
}

export const ExpenseVehicleContext = createContext<IExpenseData>(
  {} as IExpenseData
);

export const ExpenseVehicleProvider = ({ children }: ICihldrenReact) => {
  const { push } = useRouter();
  const [expenseVehicle, setExpenseVehicle] = useState<ExpenseVehicle | null>(
    null
  );
  const [value, setValue] = useState();

  const GetExpenseVehicle = async (
    expenseTypeId?: string,
    vehicleId?: string,
    page = 1,
    limit = 10 // Defina um limite padrão para o número de resultados por página
  ): Promise<ExpenseVehicle[]> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
      params: { page, limit, expenseTypeId, vehicleId }, // Adicione os parâmetros de consulta aqui
    };

    const response = await api
      .get("/expense/vehicle", config)
      .then((res) => {
        setExpenseVehicle(res.data.response);
      })
      .catch((err) => {
        return err;
      });
    return response;
  };

  const CreateExpenseVehicle = async (
    data: CreateExpenseVehicle
  ): Promise<object> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    const response = await api
      .post("/expense/vehicle", data, config)
      .then((res) => {
        setExpenseVehicle(null);
        setValue(res.data);
        toast.success("Nova despesa adicionada com sucesso!", {
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

  return (
    <ExpenseVehicleContext.Provider
      value={{
        expenseVehicle,
        GetExpenseVehicle,
        CreateExpenseVehicle,

        value,
      }}
    >
      {children}
    </ExpenseVehicleContext.Provider>
  );
};
