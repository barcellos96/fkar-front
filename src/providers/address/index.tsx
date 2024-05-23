"use client";

import { api, api_cep } from "@/service/api";
import { parseCookies } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

interface CreateAddressProps {
  street: string;
  number: string;
  complement: string;
  zip_code: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

interface ResponseAddressProps extends CreateAddressProps {
  id: string;
}

interface GetCEPProps {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

interface IAddressData {
  GetAddress(): Promise<ResponseAddressProps>;
  address?: ResponseAddressProps | null;
  value?: ResponseAddressProps;
  CreateAddress(data: CreateAddressProps): Promise<ResponseAddressProps>;
  GetByZipcode(cep: string): Promise<GetCEPProps>;
  apiCep?: GetCEPProps | null;
}

interface ICihldrenReact {
  children: ReactNode;
}

export const AddressContext = createContext<IAddressData>({} as IAddressData);

export const AddressProvider = ({ children }: ICihldrenReact) => {
  const [address, setAddress] = useState<ResponseAddressProps | null>(null);
  const [value, setValue] = useState();

  const GetAddress = async (): Promise<ResponseAddressProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const response = await api
      .get("/user/address", config)
      .then((res) => {
        setAddress(res.data.response);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });

    return response;
  };

  const CreateAddress = async (
    data: CreateAddressProps
  ): Promise<ResponseAddressProps> => {
    const { "user:accessToken": token } = parseCookies();
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };


    const response = await api
      .post("/user/address", data, config)
      .then((res) => {
        setAddress(null);
        setValue(res.data);
        toast.success("Endereço cadastrado!", { position: "top-right" });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });

    return response;
  };

  // API CEP
  const [apiCep, setApiCep] = useState<GetCEPProps | null>(null);
  const GetByZipcode = async (cep: string) => {
    const response = await api_cep
      .get(`/${cep}/json`)
      .then((res) => {
        console.log(res.data);
        setApiCep(res.data);
      })
      .catch((err) => {
        return err;
      });

    return response;
  };

  return (
    <AddressContext.Provider
      value={{
        CreateAddress,
        GetAddress,
        address,
        value,
        GetByZipcode,
        apiCep,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
