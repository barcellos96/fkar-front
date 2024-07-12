"use client";

import { api } from "@/service/api";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";
import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "sonner";
import { VehicleContext } from "../vehicle/vehicle";
import IconUserStart from "../../assets/icon-600x600.png";

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

interface AvatarProps {
  id: string;
  keyImg: string;
  urlImg: string;
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
  avatar: AvatarProps;
}

interface IUserData {
  UserLogged: () => void; // Defina o tipo da função UserLogged
  user?: UserProps | null;
  CreateUser: (data: CreateUserProps) => Promise<UserProps>;
  UpdateUser: (data: UpdateUser) => Promise<object>;
  Logout(): Promise<void>;
  UploadAvatar: (avatar: any, userId: string) => Promise<object>;
  value: string;
}

interface ICihldrenReact {
  children: ReactNode;
}

export const UserContext = createContext<IUserData>({} as IUserData);

export const UserProvider = ({ children }: ICihldrenReact) => {
  const { push } = useRouter();
  const { setVehicle } = useContext(VehicleContext);
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
        if (err.response.data.message === "Token inválido") {
          push("/login");
        }
        return err;
      });

    return response;
  };

  const [value, setValue] = useState<string>("");
  const UploadAvatar = async (avatar: any, userId: string) => {
    const formDataProfile = new FormData();
    formDataProfile.append("avatar", avatar);

    const response = await api
      .post(`/upload-avatar/${userId}`, formDataProfile)
      .then((res) => {
        toast.success("Imagem atualizada com sucesso!");
        setValue(res.data);
      })
      .catch((err) => {
        toast.error("Erro ao cadastrar avatar", { position: "top-right" });
        return err;
      });

    return response;
  };

  const CreateUser = async (data: CreateUserProps): Promise<UserProps> => {
    const response = await api
      .post("/user", data)
      .then(async (res) => {
        const blob = await fetch(IconUserStart.src).then((res) => res.blob());
        await UploadAvatar(blob, res.data.response.id);
        toast.success("Conta criada com sucesso!", { position: "top-right" });
        push("/login");
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

  const Logout = async () => {
    destroyCookie(undefined, "user:accessToken", { path: "/" });
    destroyCookie(undefined, "vehicle:selectedVehicleId", { path: "/" });

    //colocar user & vehicle como null para em novo login nao vir com dados desatualizados
    setUser(null);
    setVehicle(null);

    // Verificar se os cookies foram deletados
    const cookies = parseCookies();
    console.log("cookies", cookies);

    // Redirecionar para a página de login
    push("/login");
  };

  return (
    <UserContext.Provider
      value={{
        UserLogged,
        user,
        value,
        CreateUser,
        UpdateUser,
        Logout,
        UploadAvatar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
