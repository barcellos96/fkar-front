export const formatDate = (date: string) => {
  // Remove qualquer caractere não numérico
  const cleanDate = date.replace(/\D/g, "");

  // Limita o tamanho da string em no máximo 8 caracteres (ddmmyyyy)
  const limitedDate = cleanDate.substring(0, 8);

  // Formata a data no padrão dd/mm/yyyy conforme a entrada do usuário
  let formattedDate = limitedDate;
  if (limitedDate.length > 4) {
    formattedDate = limitedDate.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
  } else if (limitedDate.length > 2) {
    formattedDate = limitedDate.replace(/(\d{2})(\d{1,2})/, "$1/$2");
  }

  return formattedDate;
};
