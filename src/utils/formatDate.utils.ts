//CONVERT YYYY-MM-DD TO DD/MM/YYYY
export const formatFechaNacimiento = (fecha: string) => {
  const [year, month, day] = fecha.split("-");
  return `${day}/${month}/${year}`;
};