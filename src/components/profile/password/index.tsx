import Loading from "@/components/loading";
import { formatCPF } from "@/hooks/cpf";
import { formatPhone } from "@/hooks/phone";
import { UserContext } from "@/providers/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import HeaderComposition from "@/components/header/headerComposition";
import { AuthContext } from "@/providers/auth";

export default function ChangePassword() {
  const { ChangePasswordUserLogged } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const defaultValues = {
    password: "",
    confirmPassword: "",
  };
  const schema = z
    .object({
      password: z.string().min(1, "Senha é obrigatória"),
      confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
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
      await ChangePasswordUserLogged({ password: value.password });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* header formulario */}
        <HeaderComposition
          typeSubmit="submit"
          title="Atualizar Senha:"
          nameButton={loading ? <Loading /> : "Atualizar"}
          nameButtonMini={loading ? <Loading /> : "Atualizar"}
        />

        {/* formulario */}
        <div className="flex lg:flex-row flex-col mb-4 gap-1">
          <div className="flex flex-col w-4/5">
            <span className="text-base font-semibold mb-1 ml-1 ">
              Nova Senha:
            </span>
            <input
              type="password"
              id="password"
              className=" h-12 border rounded py-2 px-3 leading-tight focus:outline-none"
              placeholder="*********"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-sm ml-2 mt-1.5 text-red-300">
                {errors.password.message}
              </span>
            )}{" "}
          </div>
          <div className="flex flex-col w-4/5 mt-2 lg:mt-0">
            <span className="text-base font-semibold mb-1 ml-1">
              Confirmar nova senha:
            </span>
            <input
              type="password"
              id="confirmPassword"
              className="h-12 border rounded py-2 px-3 leading-tight focus:outline-none"
              placeholder="*********"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="text-sm ml-2 mt-1.5 text-red-300">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>

        {/* fim do formulario */}
      </form>
    </div>
  );
}
