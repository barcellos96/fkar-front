import Loading from "@/components/loading";
import PinAddress from "../../../assets/pin-address.png";

import { AddressContext } from "@/providers/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Plus } from "lucide-react";
import { formatCEP } from "@/hooks/cep";
import AddressSkeleton from "./skeleton";
import HeaderComposition from "@/components/header/headerComposition";

export default function Address() {
  const { CreateAddress, GetAddress, address, value, GetByZipcode, apiCep } =
    useContext(AddressContext);

  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [content, setContent] = useState(true);

  const [cep, setCep] = useState("");

  useEffect(() => {
    setLoadingPage(true);
    const dataFetch = async () => {
      if (address === null) {
        await GetAddress().finally(() => {
          setLoadingPage(false);
        });
      }
    };

    dataFetch();
  }, [value]);

  const defaultValues = {
    street: apiCep?.logradouro ? apiCep.logradouro : address?.street ?? "",
    number: address?.number ? address?.number : "",
    complement: address?.complement ? address?.complement : "",
    zip_code: address?.zip_code ? address?.zip_code : cep,
    neighborhood: apiCep?.bairro ? apiCep?.bairro : address?.neighborhood ?? "",
    city: apiCep?.localidade ? apiCep?.localidade : address?.city ?? "",
    state: apiCep?.uf ? apiCep?.uf : address?.state ?? "",
    country: address?.country ? address?.country : "",
  };

  const schema = z.object({
    street: z.string().min(2, "Rua, Av ou Servidao obrigatorio"),
    number: z.string().min(1, "Rua, Av ou Servidao obrigatorio"),
    complement: z.string(),
    zip_code: z.string().min(5, "CEP obrigatorio"),
    neighborhood: z.string().min(2, "Rua, Av ou Servidao obrigatorio"),
    city: z.string().min(2, "Rua, Av ou Servidao obrigatorio"),
    state: z.string().min(2, "Rua, Av ou Servidao obrigatorio"),
    country: z.string().min(2, "Rua, Av ou Servidao obrigatorio"),
  });

  type RegisterProps = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RegisterProps>({
    values: defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterProps> = async (value) => {
    setLoading(true);
    try {
      value.zip_code = cep;
      await CreateAddress(value);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  if (loadingPage) {
    return <AddressSkeleton />;
  }

  return (
    <div className="">
      {!address && content ? (
        <div className="w-full flex flex-col items-center justify-center gap-2 mb-5">
          <img src={PinAddress.src} alt="Pin Address" width={70} height={70} />
          <h1 className="text-xl font-bold text-center uppercase">
            Endereço não cadastrado
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-3 font-extralight">
            <span>Clique aqui para</span>
            <button
              onClick={() => {
                setContent(false);
              }}
            >
              <Plus className="bg-green-700 text-white rounded-full" />
            </button>
            <span> cadastrar seu endereço</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* header formulairo */}
          <HeaderComposition
            typeSubmit="submit"
            title="Meu endereço:"
            nameButton="Salvar"
          />

          {/* formulario */}
          <div className="flex flex-col mb-3">
            <span className="text-base font-semibold mb-1 ml-1 ">CEP:</span>
            <input
              type="text"
              id="zip_code"
              className="h-12 border rounded py-2 px-2 leading-tight focus:outline-none"
              placeholder="88888-888"
              {...register("zip_code")}
              onChange={(e) => {
                const inputValue = e.target.value;
                setValue("zip_code", formatCEP(inputValue));
                setCep(e.target.value);
              }}
            />
            <button
              type="button"
              className="bg-zinc-200 hover:opacity-80 text-green-700 font-light pb-1 rounded-b"
              onClick={(e) => {
                GetByZipcode(cep);
              }}
            >
              pesquisar
            </button>
            {errors.zip_code && (
              <span className="z-10 text-sm ml-2 my-2 text-red-300">
                {errors.zip_code.message}
              </span>
            )}{" "}
          </div>
          <div className={`${!apiCep && !address && `hidden`}`}>
            <div className="flex flex-row gap-1 mb-3">
              <div className="flex flex-col w-2/3">
                <span className="text-base font-semibold mb-1 ml-1 ">
                  Endereço:
                </span>
                <input
                  type="text"
                  id="street"
                  className=" h-12 border rounded py-2 px-2 leading-tight focus:outline-none"
                  placeholder="Rua / Av / Servidão"
                  {...register("street")}
                />
                {errors.street && (
                  <span className="z-10 text-sm ml-2 my-2 text-red-300">
                    {errors.street.message}
                  </span>
                )}{" "}
              </div>
              <div className="flex flex-col w-1/3">
                <span className="text-base font-semibold mb-1 ml-1">
                  Complemento:
                </span>
                <input
                  type="text"
                  id="complement"
                  className="h-12 border rounded py-2 px-2 mr-1 leading-tight focus:outline-none"
                  placeholder="Bloco- 2 - Ap 404"
                  {...register("complement")}
                />
                {errors.complement && (
                  <span className="z-10 text-sm ml-2 my-1  text-red-300">
                    {errors.complement.message}
                  </span>
                )}{" "}
              </div>
            </div>

            <div className="flex flex-row gap-1 mb-3 ">
              <div className="flex flex-col w-1/6">
                <span className="text-base font-semibold mb-1 ml-1">Nº:</span>

                <input
                  type="text"
                  id="number"
                  className=" h-12 border rounded py-2 px-1 leading-tight focus:outline-none "
                  placeholder="Nº"
                  {...register("number")}
                />
                {errors.number && (
                  <span className="z-10 text-sm ml-1 mt-1.5 text-red-300">
                    {errors.number.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-2/6">
                <span className="text-base font-semibold mb-1 ml-1">
                  Bairro:
                </span>
                <input
                  type="text"
                  id="neighborhood"
                  className=" h-12 border rounded py-2 px-2 leading-tight focus:outline-none "
                  placeholder="Bairro"
                  {...register("neighborhood")}
                />
                {errors.neighborhood && (
                  <span className="z-10 text-sm ml-1 mt-1.5 text-red-300">
                    {errors.neighborhood.message}
                  </span>
                )}{" "}
              </div>
              <div className="flex flex-col w-3/6">
                <span className="text-base font-semibold mb-1 ml-1">
                  Cidade:
                </span>
                <input
                  type="text"
                  id="city"
                  className=" h-12 border rounded py-2 px-2 leading-tight focus:outline-none "
                  placeholder="Cidade"
                  {...register("city")}
                />
                {errors.city && (
                  <span className="z-10 text-sm ml-1 mt-1.5 text-red-300">
                    {errors.city.message}
                  </span>
                )}{" "}
              </div>
            </div>

            <div className="flex flex-row gap-1 h-10 mb-10">
              <div className="flex flex-col w-1/2">
                <span className="text-base font-semibold mb-1 ml-1">
                  Estado:
                </span>
                <input
                  type="text"
                  id="state"
                  className=" h-12 border rounded py-2 px-2 leading-tight focus:outline-none "
                  placeholder="Estado"
                  {...register("state")}
                />
                {errors.state && (
                  <span className="z-10 text-sm ml-1 mt-1.5 text-red-300">
                    {errors.state.message}
                  </span>
                )}{" "}
              </div>
              <div className="flex flex-col w-1/2">
                <span className="text-base font-semibold mb-1 ml-1">País:</span>
                <input
                  type="text"
                  id="country"
                  className=" h-12 border rounded py-2 px-2 leading-tight focus:outline-none "
                  placeholder="Brasil"
                  {...register("country")}
                />
                {errors.country && (
                  <span className="z-10 text-sm ml-1 mt-1.5 text-red-300">
                    {errors.country.message}
                  </span>
                )}{" "}
              </div>
            </div>
          </div>

          {/* fim do formulario */}
        </form>
      )}
    </div>
  );
}
