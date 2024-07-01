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

export default function FormsForgotPassword() {
  const { ForgotPassword } = useContext(AuthContext);

  const { "user:accessToken": token } = parseCookies();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const schema = z.object({
    email: z.string().email("Email inválido").min(1, "Email obrigatório"),
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
      await ForgotPassword(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const watchEmail = watch("email");

  // useEffect to check for token and redirect if present
  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center lg:w-1/2 p-8">
      <section className="flex flex-col w-96 mb-8">
        <span
          className="flex items-center gap-2 pb-8 cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft size={17} /> Voltar
        </span>
        <h1 className="text-xl font-bold mb-1 ">Recuperar Senha</h1>
        <span className="text-base font-light">
          Digite seu email. Você receberá um código para o próximo passo!
        </span>
      </section>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg sm:w-96 mt-6">
        <div className="flex flex-col mb-4">
          <label className="font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            className="h-12 border rounded py-2 px-3 leading-tight focus:outline-none md:min-w-96"
            placeholder="nome@email.com"
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
  );
}
