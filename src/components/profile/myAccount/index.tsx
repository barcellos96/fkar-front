import Loading from "@/components/loading";
import { formatCPF } from "@/hooks/cpf";
import { formatPhone } from "@/hooks/phone";
import { UserContext } from "@/providers/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import MyAccountSkeleton from "./skeleton";
import HeaderComposition from "@/components/header/headerComposition";
import AvatarLayout from "@/components/avatar";
import { toast } from "sonner";

export default function MyAccount() {
  const { UpdateUser, user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const defaultValues = {
    firstName: user?.firstName ? user?.firstName : "",
    lastName: user?.lastName ? user?.lastName : "",
    cpf: user?.cpf ? user?.cpf : "",
    phone: user?.phone ? user?.phone : "",
    email: user?.email ? user?.email : "",
  };

  const schema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    cpf: z.string().min(9),
    phone: z.string().min(9),
    email: z.string().email().min(3),
  });

  type RegisterProps = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterProps>({
    values: defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterProps> = async (value) => {
    setLoading(true);
    try {
      await UpdateUser(value).finally(() => {
        toast.success("Conta atualizada com sucesso!", {
          position: "top-right",
        });
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {!user ? (
        <MyAccountSkeleton />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* header formulario */}
          <HeaderComposition
            typeSubmit="submit"
            title="Minha conta:"
            nameButton={loading ? <Loading /> : "Salvar"}
          />

          <section className=" w-20">
            <AvatarLayout inProfile />
          </section>

          {/* formulario */}
          <div className="flex flex-row mb-4 gap-1 h-10">
            <div className="flex flex-col w-1/2">
              <span className="text-base font-semibold mb-1 ml-1 ">Nome:</span>
              <input
                type="text"
                id="firstName"
                className=" h-12 border rounded py-2 px-3 leading-tight focus:outline-none"
                placeholder="Nome"
                {...register("firstName")}
              />
              {errors.firstName && (
                <span className="text-sm ml-2 mt-1.5 text-red-300">
                  {errors.firstName.message}
                </span>
              )}{" "}
            </div>
            <div className="flex flex-col w-1/2">
              <span className="text-base font-semibold mb-1 ml-1">
                Sobrenome:
              </span>
              <input
                type="text"
                id="lastName"
                className="h-12 border rounded py-2 px-3 mr-1 leading-tight focus:outline-none"
                placeholder="Sobrenome"
                {...register("lastName")}
              />
              {errors.lastName && (
                <span className="text-sm ml-2 mt-1.5 text-red-300">
                  {errors.lastName.message}
                </span>
              )}{" "}
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <span className="text-base font-semibold mt-6 mb-1 ml-1">CPF:</span>
            <input
              type="cpf"
              id="cpf"
              className=" h-12 border rounded py-2 px-3 leading-tight focus:outline-none "
              placeholder="CPF"
              {...register("cpf")}
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
            <span className="text-base font-semibold mb-1 ml-1">Celular:</span>
            <input
              type="text"
              id="phone"
              className=" h-12 border rounded py-2 px-3 leading-tight focus:outline-none "
              placeholder="DDD + celular"
              {...register("phone")}
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
          <div className="flex flex-col mb-6">
            <span className="text-base font-semibold mb-1 ml-1">E-mail:</span>
            <input
              type="email"
              id="email"
              className=" h-12 border rounded py-2 px-3 leading-tight focus:outline-none "
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-sm ml-1 mt-1.5 text-red-300">
                {errors.email.message}
              </span>
            )}
          </div>
          {/* fim do formulario */}
        </form>
      )}
    </div>
  );
}
