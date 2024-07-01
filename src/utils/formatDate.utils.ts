export const formatFechaNacimiento = (fecha: string) => {
  if (!fecha) return "";
  const [year, month, day] = fecha.split("-");
  return `${day}/${month}/${year}`;
};