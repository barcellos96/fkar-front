// Converta created_at para Date se ainda não for um Date object

// Função para formatar a data como "6 de Agosto de 2024"
export const formatDate = (date: Date): string => {
  if (date instanceof Date && !isNaN(date.getTime())) {
    // Opções de formatação para dia, mês e ano
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const dateFormatter = new Intl.DateTimeFormat("pt-BR", options);
    const parts = dateFormatter.formatToParts(date);

    // Organize a data no formato desejado
    const day = parts.find((part) => part.type === "day")?.value ?? "";
    const month = parts.find((part) => part.type === "month")?.value ?? "";
    const year = parts.find((part) => part.type === "year")?.value ?? "";

    return `${day} de ${
      month.charAt(0).toUpperCase() + month.slice(1)
    } de ${year}`;
  }
  return "Data inválida";
};
