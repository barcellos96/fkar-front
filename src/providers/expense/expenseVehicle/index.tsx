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

export interface User {
  id: string;
  isActive: boolean;
}

export interface Vehicle {
  id: string;
  brand: string;
}

export interface ExpenseType {
  id: string;
  name: string;
}

export interface ExpenseVehicleServicesProps {
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

interface UpdateExpenseVehicleProps {
  expenseVehicleId?: string;
  date?: string;
  description?: string;
  expense_type_id?: string;
  expense_vehicle_services?: ExpenseVehicleServicesProps[]; // Adjust if you have a specific type for services
  amount?: number;
  fuel_type?: string | null;
  fuel_liters?: string | null;
  price_liters?: string | null;
  km?: number;
  location?: string | null;
  method_payment?: string | null;
  status_payment?: boolean;
  observation?: string | null;
}

export interface ExpenseVehicle {
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

///////////////////////////

interface ListItemProps {
  id: string;
  date: string;
  km: number;
  type: string;
  description: string;
  title: string;
  amount: string;
  amount_received: string;
  fuel_type: string | null;
  fuel_liters: string | null;
  price_liters: string | null;
  location: string | null;
  method_payment: string | null;
  status_payment: boolean;
  observation: string | null;
  incoming_type: IncomingType;
  expense_type: ExpenseType;
  expense_vehicle_services: ExpenseVehicleServicesProps[];
  user: User;
  vehicle: Vehicle;
}

interface IncomingType {
  id: string;
  name: string;
}

interface FilteredListAllResponseProps {
  filteredData: ListItemProps[];
  total: number;
}

export interface ListAllExpenseProps {
  list: ListItemProps[];
  total: number;

  page: number;
  limit: number;
}

export interface DeleteExpenseVehicle {
  message: "Despesa deletada com sucesso!";
  expense_vehicle: {
    id: string;
    date: Date;
    description: string;
    amount: string;
    fuel_type?: string | null;
    fuel_liters?: string | null;
    price_liters?: string | null;
    km: string;
    location: string;
    method_payment?: string | null;
    status_payment?: boolean;
    observation?: string | null;
    user: User;
    vehicle: Vehicle;
    expense_type: ExpenseType;
  };
}

interface ListAllProps {
  vehicleId: string;
  page?: string;
  limit?: string;
}

interface FiltredListAllProps {
  vehicleId: string;
  start_date?: string;
  end_date?: string;
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
  UpdateExpenseVehicle(
    expenseVehicleId: string,
    data: UpdateExpenseVehicleProps
  ): Promise<object>;
  DeleteExpenseVehicle(
    expenseVehicleId?: string
  ): Promise<DeleteExpenseVehicle>;

  setTabRouteConfig: Dispatch<SetStateAction<string>>;
  tabRouteConfig: string;

  ListAll: ({
    vehicleId,
    page,
    limit,
  }: ListAllProps) => Promise<ListAllExpenseProps>;

  listAll?: ListAllExpenseProps | null;

  FilteredListAll: ({
    vehicleId,
    start_date,
    end_date,
  }: FiltredListAllProps) => Promise<FilteredListAllResponseProps>;
  filteredListAll: FilteredListAllResponseProps | null;
}

interface ICihldrenReact {
  children: ReactNode;
}

export const ExpenseVehicleContext = createContext<IExpenseData>(
  {} as IExpenseData
);

export const ExpenseVehicleProvider = ({ children }: ICihldrenReact) => {
  const [tabRouteConfig, setTabRouteConfig] =
    useState<string>("Tipo de Despesa");

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

  const UpdateExpenseVehicle = async (
    expenseVehicleId: string,
    data: UpdateExpenseVehicleProps
  ): Promise<object> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    const response = await api
      .patch(`/expense/vehicle/${expenseVehicleId}`, data, config)
      .then((res) => {
        setExpenseVehicle(null);
        setValue(res.data);
        toast.warning("Despesa atualizada com sucesso!", {
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

  const DeleteExpenseVehicle = async (
    expenseVehicleId?: string
  ): Promise<DeleteExpenseVehicle> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    const response = await api
      .delete(`/expense/vehicle/${expenseVehicleId}`, config)
      .then((res) => {
        toast.success("Deletado com sucesso!", {
          position: "top-right",
        });
        setValue(res.data);
        setExpenseVehicle(null);
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "top-right" });
        return err;
      });

    return response;
  };

  const [listAll, setListAll] = useState<ListAllExpenseProps | null>(null);

  const ListAll = async ({
    vehicleId,
    page,
    limit,
  }: ListAllProps): Promise<ListAllExpenseProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
      params: { page, limit }, // Adicione os parâmetros de consulta aqui
    };
    const response = await api
      .get(`/expense-incoming/list_all/${vehicleId}`, config)
      .then((res) => {
        setListAll(res.data.response);
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "top-right" });
        return err;
      });

    return response;
  };

  const [filteredListAll, setFiltredListAll] =
    useState<FilteredListAllResponseProps | null>(null);

  const FilteredListAll = async ({
    vehicleId,
    start_date,
    end_date,
  }: FiltredListAllProps): Promise<FilteredListAllResponseProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
      params: { start_date, end_date }, // Adicione os parâmetros de consulta aqui
    };
    const response = await api
      .get(`/expense-incoming/list_all/${vehicleId}`, config)
      .then((res) => {
        setFiltredListAll(res.data.response);
      })
      .catch((err) => {
        toast.error(err.response.data.message, { position: "top-right" });
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
        UpdateExpenseVehicle,
        DeleteExpenseVehicle,
        setTabRouteConfig,
        tabRouteConfig,
        value,
        ListAll,
        listAll,
        FilteredListAll,
        filteredListAll,
      }}
    >
      {children}
    </ExpenseVehicleContext.Provider>
  );
};
