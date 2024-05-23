export const formatTime = (time: string) => {
  // Remove qualquer caractere não numérico
  const cleanTime = time.replace(/\D/g, "");

  // Limita o tamanho da string em no máximo 4 caracteres (HHmm)
  const limitedTime = cleanTime.substring(0, 4);

  // Formata a hora no padrão HH:mm conforme a entrada do usuário
  let formattedTime = limitedTime;
  if (limitedTime.length > 2) {
    formattedTime = limitedTime.replace(/(\d{2})(\d{1,2})/, "$1:$2");
  }

  return formattedTime;
};
