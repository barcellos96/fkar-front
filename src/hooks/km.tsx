export const formatKm = (km: number): string => {
  let formattedKm = km?.toString().replace(/\D/g, "");

  // Verifica se o número de km tem mais de 3 dígitos
  if (formattedKm.length > 3) {
    // Insere um ponto após o terceiro dígito da direita para a esquerda
    formattedKm = formattedKm?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  // Verifica se o número de km tem mais de 6 dígitos
  if (formattedKm.length > 6) {
    // Insere um ponto após o sexto dígito da direita para a esquerda
    formattedKm = formattedKm?.replace(/(\d{3})(?=(\d{3})+(?!\d))/g, "$1.");
  }

  return formattedKm;
};
