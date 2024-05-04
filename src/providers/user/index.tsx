"use client";

import { api } from "@/service/api";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

interface UpdateUser {
  cpf?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface SimpleUser {
  cpf: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface CreateUserProps extends SimpleUser {
  password: string;
}
interface UserProps extends SimpleUser {
  id: string;
  address: string | null;
  created_at: string;
  updated_at: string;
  isActive: boolean;
}

interface IUserData {
  UserLogged: () => void; // Defina o tipo da função UserLogged
  user?: UserProps | null;
  CreateUser: (data: CreateUserProps) => Promise<UserProps>;
  UpdateUser: (data: UpdateUser) => Promise<object>;
}

interface ICihldrenReact {
  children: ReactNode;
}

export const UserContext = createContext<IUserData>({} as IUserData);

export const UserProvider = ({ children }: ICihldrenReact) => {
  const { push } = useRouter();
  const [user, setUser] = useState<UserProps | null>(null);

  const UserLogged = async (): Promise<void> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .get("/user-logged", config)
      .then((res) => {
        setUser(res.data.response);
      })
      .catch((err) => {
        return err;
      });

    return response;
  };

  const CreateUser = async (data: CreateUserProps): Promise<UserProps> => {
    const response = await api
      .post("/user", data)
      .then((res) => {
        push("/login");
        toast.success("Conta criada com sucesso!", { position: "top-right" });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });

    return response;
  };

  const UpdateUser = async (data: UpdateUser) => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .patch("/user", data, config)
      .then((res) => {
        toast.success("Conta atualizada com sucesso!", {
          position: "top-right",
        });
        UserLogged();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });
    return response;
  };

  return (
    <UserContext.Provider
      value={{
        UserLogged,
        user,
        CreateUser,
        UpdateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
