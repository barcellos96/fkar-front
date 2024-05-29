// Função para formatar número como moeda brasileira (R$)
export default function formatCurrency(value: number) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatter.format(value);
}
