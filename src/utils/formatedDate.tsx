const formattedDate = (date: Date) => {
  const dataIso = date;
  const data = new Date(dataIso);

  const dia = String(data.getUTCDate()).padStart(2, "0");
  const mes = String(data.getUTCMonth() + 1).padStart(2, "0");
  const ano = data.getUTCFullYear();

  const horas = String(data.getUTCHours()).padStart(2, "0");
  const minutos = String(data.getUTCMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${ano} - ${horas}h${minutos}`;
};

export default formattedDate;
