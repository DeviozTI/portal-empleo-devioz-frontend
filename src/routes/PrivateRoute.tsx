import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isAuthenticatedAtom, isCompanyAtom } from "../store/user";

interface Props {
  children: React.ReactElement;
}

export const PrivateRoute: FC<Props> = ({ children }) => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [isCompany] = useAtom(isCompanyAtom);

  if (isAuthenticated === false) {
    return <Navigate to="/admin/iniciar-sesion" replace />;
  }

  if (isCompany === false) {
    console.log("no autorizado")
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};
