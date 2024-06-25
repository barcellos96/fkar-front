export default function formatPlate(plate: string): string {
  // Remove quaisquer caracteres não alfanuméricos, exceto o hífen
  let cleanedPlate = plate.replace(/[^a-zA-Z0-9]/g, "");

  // Limita o comprimento a 7 caracteres antes de aplicar a formatação
  if (cleanedPlate.length > 7) {
    cleanedPlate = cleanedPlate.slice(0, 7);
  }

  // Adiciona o hífen após os três primeiros caracteres
  const formattedPlate = cleanedPlate.slice(0, 3) + "-" + cleanedPlate.slice(3);

  return formattedPlate.toUpperCase();
}
