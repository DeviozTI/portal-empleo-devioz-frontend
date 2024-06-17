import React, { FC,  useState } from "react";
import { Navigate } from "react-router-dom";
//import { checkAuthentication } from "../hooks/useAuth";

interface Props {
  children: React.ReactElement;
}

export const PrivateRoute: FC<Props> = ({ children }) => {
  const [isAuthenticated] = useState<boolean | null>(false);

//   useEffect(() => {
//     const authenticated = checkAuthentication();
//     setIsAuthenticated(authenticated);
//   }, []);

  if (isAuthenticated === null) {
    // Manejar el estado de carga mientras se verifica la autenticación
    return;
  }

  return isAuthenticated ? children : <Navigate to="/auth/admin" />;
};
