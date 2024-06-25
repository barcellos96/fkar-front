"use client";

import { api } from "@/service/api";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import { createContext, ReactNode } from "react";
import { toast } from "sonner";

interface LoginProps {
  email: string;
  password: string;
}

interface ChangePasswordProps {
  password: string;
}

interface IAuthData {
  Login(data: LoginProps): Promise<object>;
  ChangePasswordUserLogged(data: ChangePasswordProps): Promise<object>;
}

interface ICihldrenReact {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthData>({} as IAuthData);

export const AuthProvider = ({ children }: ICihldrenReact) => {
  const { push } = useRouter();

  const Login = async (data: LoginProps) => {
    const response = await api
      .post("/login", data)
      .then((res) => {
        setCookie({ res }, "user:accessToken", res.data.accessToken, {
          maxAge: 60 * 60 * 24 * 2, //2 dias
          path: "/",
        });
        push("/dashboard");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });

    return response;
  };

  const ChangePasswordUserLogged = async (data: ChangePasswordProps) => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    const response = await api
      .patch("/change-password", data, config)
      .then((res) => {
        toast.success("Senha atualizada!", { position: "top-right" });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });

    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        Login,
        ChangePasswordUserLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
