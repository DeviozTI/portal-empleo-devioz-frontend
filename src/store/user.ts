import { atom } from "jotai";
import { IDataUser } from "../interface/auth";

// Función para obtener el usuario del localStorage
const getUserFromLocalStorage = (): IDataUser | null => {
  const dataUser = localStorage.getItem("dataUser");
  return dataUser ? JSON.parse(dataUser) : null;
};

// Inicializa el átomo con el valor del localStorage o null si no existe
export const userResponseAtom = atom<IDataUser | null>(getUserFromLocalStorage());

export const isAuthenticatedAtom = atom<boolean>(
  Boolean(localStorage.getItem("isAuthenticated"))
);
