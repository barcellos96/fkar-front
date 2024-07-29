"use client";

import { api } from "@/service/api";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

interface LoginProps {
  email: string;
  password: string;
}

interface ChangePasswordProps {
  password: string;
}

interface ForgotProps {
  email: string;
}

interface AuthenticationCodeProps {
  random_code: string;
}

interface ResponseAuthenticationProps {
  message: string;
  status: string;
  statusCode: number;
  response: {
    new_password: string;
  };
}

interface IAuthData {
  Login(data: LoginProps): Promise<object>;
  ChangePasswordUserLogged(data: ChangePasswordProps): Promise<object>;
  ForgotPassword(data: ForgotProps): Promise<string>;
  AuthenticationCode(
    data: AuthenticationCodeProps
  ): Promise<ResponseAuthenticationProps>;
  promise?: ResponseAuthenticationProps | null;
  LoginAdmin(data: LoginProps): Promise<object>;
}

interface ICihldrenReact {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthData>({} as IAuthData);

export const AuthProvider = ({ children }: ICihldrenReact) => {
  const { push } = useRouter();
  const [promise, setPromise] = useState<ResponseAuthenticationProps | null>(
    null
  );

  const Login = async (data: LoginProps) => {
    const response = await api
      .post("/login", data)
      .then((res) => {
        setCookie({ res }, "user:accessToken", res.data.accessToken.token, {
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

  const LoginAdmin = async (data: LoginProps) => {
    const response = await api
      .post("/login-admin", data)
      .then((res) => {
        setCookie({ res }, "user:accessToken", res.data.accessToken.token, {
          maxAge: 60 * 60 * 24 * 2, //2 dias
          path: "/",
        });
        push("/dashboard/admin");
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

  const ForgotPassword = async (data: ForgotProps) => {
    const response = await api
      .post("/forgot-password", data)
      .then((res) => {
        setPromise(null);
        toast.success(res.data, { position: "top-right" });
        push("/recuperar-senha/autenticacao");
      })
      .catch((err) => {
        return err.response.data;
      });

    return response;
  };

  const AuthenticationCode = async (data: AuthenticationCodeProps) => {
    const response = await api
      .post("/authentication-code", data)
      .then((res) => {
        toast.success(res.data.message, { position: "top-right" });
        setPromise(res.data);
      })
      .catch((err) => {
        setPromise(err.response.data);

        toast.error(err.response.data.message, { position: "top-right" });
        return err.response.data;
      });

    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        Login,
        LoginAdmin,
        ChangePasswordUserLogged,
        ForgotPassword,
        AuthenticationCode,
        promise,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
