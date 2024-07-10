"use client";

import Link from "next/link";

import { useContext, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import Loading from "../loading";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContext } from "@/providers/user";
import { formatPhone } from "@/hooks/phone";
import { formatCPF } from "@/hooks/cpf";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FormsRegister() {
  const { back } = useRouter();
  const { CreateUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const schema = z.object({
    firstName: z.string().min(1, "Nome obrigatório"),
    lastName: z.string().min(1, "Sobrenome obrigatório"),
    cpf: z.string().min(1, "CPF obrigatório"),
    phone: z.string().min(1, "Telefone obrigatório"),
    email: z.string().email("Email inválido").min(1, "Email obrigatório"),
    password: z.string().min(1, "Senha obrigatória"),
  });

  type RegisterProps = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<RegisterProps>({
    resolver: zodResolver(schema),
  });

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const cpf = watch("cpf");
  const phone = watch("phone");
  const email = watch("email");
  const password = watch("password");

  const watching = firstName && lastName && cpf && phone && email && password;

  const onSubmit: SubmitHandler<RegisterProps> = async (value) => {
    setLoading(true);
    try {
      await CreateUser(value);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center lg:w-1/2 ">
      <span
        onClick={back}
        className="flex flex-row items-center  w-full px-12 mb-7 gap-2"
      >
        <ArrowLeft size={20} /> <p className="text-zinc-400">Voltar</p>
      </span>

      <h1 className="flex text-center text-2xl font-bold sm:w-max">
        Crie sua conta na FKar
      </h1>
      <span className="font-extralight text-zinc-400 text-center mb-5 px-10 sm:px-0 sm:w-max">
        Comece a gerenciar seus veiculos gratuitamente!
      </span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xs slg:max-w-5xl md:px-0 "
      >
        <div className="flex flex-row mb-4 gap-1 h-10">
          <div className="flex flex-col w-1/2">
            <input
              type="text"
              id="firstName"
              className=" h-12 border rounded py-2 px-3 leading-tight focus:outline-none"
              placeholder="Nome"
              {...register("firstName", {
                required: "Nome obrigatório",
              })}
            />
            {errors.firstName && (
              <span className="text-sm ml-2 mt-1.5 text-red-300">
                {errors.firstName.message}
              </span>
            )}{" "}
          </div>
          <div className="flex flex-col w-1/2">
            <input
              type="text"
              id="lastName"
              className="h-12 border rounded py-2 px-3 mr-1 slg:mr-0 leading-tight focus:outline-none"
              placeholder="Sobrenome"
              {...register("lastName", {
                required: "Sobrenome obrigatório",
              })}
            />
            {errors.lastName && (
              <span className="text-sm ml-2 mt-1.5 text-red-300">
                {errors.lastName.message}
              </span>
            )}{" "}
          </div>
        </div>
        {/* <div className="flex flex-col mb-4"></div> */}
        <div className="flex flex-col mb-4">
          <input
            type="cpf"
            id="cpf"
            className=" h-12 border rounded py-2 px-3 leading-tight focus:outline-none md:min-w-96"
            placeholder="CPF"
            {...register("cpf", {
              required: "CPF obrigatório",
            })}
            onChange={(e) => {
              const inputValue = e.target.value;
              setValue("cpf", formatCPF(inputValue));
            }}
          />
          {errors.cpf && (
            <span className="text-sm ml-1 mt-1.5 text-red-300">
              {errors.cpf.message}
            </span>
          )}{" "}
        </div>

        <div className="flex flex-col mb-4">
          <input
            type="text"
            id="phone"
            className=" h-12 border rounded py-2 px-3 leading-tight focus:outline-none md:min-w-96"
            placeholder="DDD + celular"
            {...register("phone", {
              required: "Celular obrigatório",
            })}
            onChange={(e) => {
              const inputValue = e.target.value;
              setValue("phone", formatPhone(inputValue));
            }}
          />
          {errors.phone && (
            <span className="text-sm ml-1 mt-1.5 text-red-300">
              {errors.phone.message}
            </span>
          )}{" "}
        </div>
        <div className="flex flex-col mb-4">
          <input
            type="email"
            id="email"
            className=" h-12 border rounded py-2 px-3 leading-tight focus:outline-none md:min-w-96"
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
            className=" h-12 border rounded py-2 px-3 leading-tight focus:outline-none md:min-w-96"
            placeholder="Senha"
            {...register("password", {
              required: "Senha obrigatório",
            })}
          />
          {errors.password && (
            <span className="text-sm ml-1 mt-1.5 text-red-300">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex flex-col items-center justify-between mt-7 w-auto">
          <button
            type="submit"
            disabled={!watching || isSubmitting}
            className={`bg-green-700 w-full ${
              watching && "hover:opacity-80"
            } text-white font-bold flex items-center justify-center py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              !watching && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? <Loading /> : "Cadastrar Gratuitamente"}
          </button>
          <Link
            href="/login"
            className="text-zinc-400 hover:text-zinc-500 mt-5 mb-14 sm:mb-0"
          >
            cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
