"use client";

import { AuthContext } from "@/providers/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

import { useContext, useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import Loading from "../loading";

type LoginProps = {
  email: string;
  password: string;
};

export default function FormsLoginAdmin() {
  const { LoginAdmin } = useContext(AuthContext);

  const { "user:accessToken": token } = parseCookies();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginProps>();

  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    setLoading(true);
    try {
      await LoginAdmin(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const watchEmail = watch("email");
  const watchPassword = watch("password");

  // useEffect to check for token and redirect if present
  useEffect(() => {
    if (token) {
      router.push("/dashboard/admin");
    }
  }, [token]);

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg sm:w-96">
        <div className="flex flex-col mb-4">
          <input
            type="email"
            id="email"
            className="h-12 border rounded py-2 px-3 leading-tight focus:outline-none md:min-w-96"
            placeholder="Email"
            {...register("email", {
              required: "Email obrigatório",
            })}
          />
          {errors.email && (
            <span className="text-sm ml-1 mt-1.5 text-red-300">
              {errors.email.message}
            </span>
          )}{" "}
        </div>
        <div className="flex flex-col mb-6">
          <input
            type="password"
            id="password"
            className="h-12 border rounded py-2 px-3 leading-tight focus:outline-none md:min-w-96"
            placeholder="Senha"
            {...register("password", {
              required: "Senha obrigatório",
            })}
          />
          {errors.password && (
            <span className="text-sm ml-1 mt-1.5 text-red-300">
              {errors.password.message}
            </span>
          )}{" "}
        </div>
        <div className="flex items-center justify-between mt-7">
          <button
            type="submit"
            disabled={!watchEmail || !watchPassword || isSubmitting}
            className={`bg-green-700 ${
              (watchEmail || watchPassword) && "hover:opacity-80"
            } text-white font-bold flex items-center justify-center py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              (!watchEmail || !watchPassword) && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? <Loading /> : "Entrar"}
          </button>
          <Link
            className="inline-block align-baseline font-bold text-base text-green-700 hover:opacity-80"
            href={"/recuperar-senha"}
          >
            Esqueceu sua senha?
          </Link>
        </div>
      </form>
      <div className="flex flex-row flex-wrap items-center justify-center mt-10 lg:w-96">
        <p>Ainda não tem uma conta?</p>
        <Link
          className="font-bold text-green-700 ml-1 hover:opacity-80"
          href={"/cadastrar"}
        >
          Registrar aqui
        </Link>
      </div>
    </div>
  );
}
