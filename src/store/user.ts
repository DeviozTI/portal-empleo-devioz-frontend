import { atom } from "jotai";
import { IDataUser } from "../interface/user";
import { getBooleanFromLocalStorage } from "../utils/convertBoolenFromLocalStorage";

// Function to get user from localStorage
const getUserFromLocalStorage = (): IDataUser | null => {
  const dataUser = localStorage.getItem("dataUser");
  return dataUser ? JSON.parse(dataUser) : null;
};

export const userResponseAtom = atom<IDataUser | null>(
  getUserFromLocalStorage()
);

export const isAuthenticatedAtom = atom<boolean>(
  getBooleanFromLocalStorage("isAuthenticated")
);
export const isCompanyAtom = atom<boolean>(
  getBooleanFromLocalStorage("isCompany")
);
