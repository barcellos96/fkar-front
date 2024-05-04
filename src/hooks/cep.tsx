export const formatCEP = (cep: string) => {
  return cep.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");
};
