"use client";

import { AuthContext } from "@/providers/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

import { useContext, useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import Loading from "../loading";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function FormsAuthentication() {
  const { AuthenticationCode, promise } = useContext(AuthContext);

  const { "user:accessToken": token } = parseCookies();
  const router = useRouter();

  const [span, setSpan] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSpan(false);
  }, []);

  const schema = z.object({
    random_code: z.string().min(1, "Código obrigatório"),
  });

  type RegisterProps = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterProps>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<RegisterProps> = async (data) => {
    setLoading(true);
    try {
      await AuthenticationCode(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const watchEmail = watch("random_code");

  // useEffect to check for token and redirect if present
  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token]);

  return (
    <>
      {promise?.response ? (
        <div className="flex mt-10">
          <div className="flex flex-col items-center  bg-zinc-100 p-8 rounded-lg shadow-lg w-full ">
            <h1 className="text-2xl font-bold text-center mb-4 text-green-600">
              SUCESSO!
            </h1>
            <p className="text-center mb-4 w-full sm:w-96">
              O código foi confirmado com sucesso.
            </p>
            <div className="bg-gray-200 p-4 rounded w-full">
              <p className="text-center">Sua nova senha é:</p>
              <p className="text-center font-mono text-2xl font-bold text-green-600 mt-2">
                {promise.response.new_password ?? ""}
              </p>
            </div>

            <button
              className="w-full bg-green-600 cursor-pointer text-white mt-5 rounded py-2 font-semibold"
              onClick={() => router.push("/login")}
            >
              Fazer login
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center lg:w-1/2 p-8">
          <section className="flex flex-col w-96 mb-8">
            <span
              className="flex items-center gap-2 pb-8 cursor-pointer"
              onClick={() => router.push("/login")}
            >
              <ArrowLeft size={17} /> Voltar para login
            </span>

            <h1 className="text-xl font-bold mb-1 ">Autenticar Código</h1>
            <span className="text-base font-light">
              Você receberá um código para verificação. Digite o código recebido
              no seu email! Validade de 10 minutos.
            </span>
          </section>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg sm:w-96 mt-3"
          >
            <div className="flex flex-col mb-4">
              <label className="font-bold mb-2">Código:</label>
              <input
                type="text"
                id="random_code"
                className="h-12 border rounded py-2 px-3 leading-tight focus:outline-none md:min-w-96"
                placeholder="XXXXXX"
                {...register("random_code", {
                  required: "Email obrigatório",
                })}
              />
              {errors.random_code && (
                <span className="text-sm ml-1 mt-1.5 text-red-300">
                  {errors.random_code.message}
                </span>
              )}{" "}
            </div>

            <button
              type="submit"
              disabled={!watchEmail || isSubmitting}
              className={`bg-green-700 ${
                watchEmail && "hover:opacity-80"
              } text-white font-bold flex items-center justify-center py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                !watchEmail && "opacity-50 cursor-not-allowed"
              }`}
            >
              {loading ? <Loading /> : "Recuperar Senha"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
