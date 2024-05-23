"use client";

import { api } from "@/service/api";
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

interface ExpenseVehicle {
  id: string;
  date: string;
  description: string;
  amount: string;
  fuel_type: string | null;
  fuel_liters: number | null;
  price_liters: number | null;
  km: number;
  location: string;
  method_payment: string;
  status_payment: boolean;
  observation: string | null;
  user: User;
  vehicle: Vehicle;
  expense_type: ExpenseType;
  expense_vehicle_services: any[]; // Adjust if you have a specific type for services
}

interface IExpenseData {
  expenseVehicle?: ExpenseVehicle[] | null;
  GetExpenseVehicle: (expenseTypeId?: string) => void;
  value?: any;
}

interface ICihldrenReact {
  children: ReactNode;
}

export const ExpenseVehicleContext = createContext<IExpenseData>(
  {} as IExpenseData
);

export const ExpenseVehicleProvider = ({ children }: ICihldrenReact) => {
  const [expenseVehicle, setExpenseVehicle] = useState<ExpenseVehicle[] | null>(
    null
  );
  const [value, setValue] = useState();

  const GetExpenseVehicle = async (expenseTypeId?: string) => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

     // Construct URL with or without expenseTypeId
     let url = "/expense/vehicle";
     if (expenseTypeId) {
       url += `?expenseTypeId=${expenseTypeId}`;
     }

    const response = await api
      .get(url, config)
      .then((res) => {
        setExpenseVehicle(res.data.response);
      })
      .catch((err) => {
        return err;
      });
    return response;
  };

  return (
    <ExpenseVehicleContext.Provider
      value={{
        expenseVehicle,
        GetExpenseVehicle,

        value,
      }}
    >
      {children}
    </ExpenseVehicleContext.Provider>
  );
};
