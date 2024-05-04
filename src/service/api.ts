import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.fkar.com.br/",
});

export const api_cep = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});
