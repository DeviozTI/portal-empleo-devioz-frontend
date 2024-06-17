import { useAtom } from "jotai";
import { handleManagmentError } from "../helpers/HookManagmentError";
import { AxiosError } from "axios";
import { empleoDeviozAPI } from "../api/empleoDeviozApi";
import {
  IFormLoginRequest,
  IFormRegisterPostulantRequest,
} from "../interface/auth";
import { isAuthenticatedAtom, userResponseAtom } from "../store/user";

const useAuth = () => {
  const [userResponse, setUserResponse] = useAtom(userResponseAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const handleAuthCompleteRegisterPostulant = async (
    dataForm: IFormRegisterPostulantRequest,
    token_register: string
  ) => {
    try {
      const response = await empleoDeviozAPI.put(
        "/auth/registro-completo-postulante",
        dataForm,
        {
          headers: {
            Authorization: `Bearer ${token_register}`,
          },
        }
      );

      const { access_token, dataUser, isCompany, message } = response.data;

      setUserResponse(dataUser);

      localStorage.setItem("isAuthenticated", String(true));
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("isCompany", String(isCompany));
      localStorage.setItem("dataUser", JSON.stringify(dataUser));

      setIsAuthenticated(true);

      return {
        message,
        statusCode: response.status,
        ok: true,
      };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleAuthIncompleteRegisterPostulant = async (correo: string) => {
    try {
      const response = await empleoDeviozAPI.post(
        "/auth/registro-incompleto-postulante",
        {
          correo,
        }
      );

      const { message } = response.data;

      return {
        message,
        statusCode: response.status,
        ok: true,
      };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleAuthLoginPostulant = async (dataForm: IFormLoginRequest) => {
    try {
      const response = await empleoDeviozAPI.post(
        "/auth/iniciar-sesion",
        dataForm
      );

      const { access_token, dataUser, isCompany, message } = response.data;

      setUserResponse(dataUser);

      localStorage.setItem("isAuthenticated", String(true));
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("isCompany", String(isCompany));
      localStorage.setItem("dataUser", JSON.stringify(dataUser));

      setIsAuthenticated(true);

      return {
        message,
        statusCode: response.status,
        ok: true,
      };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    setUserResponse(null);
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No se encontró el token de acceso");
      }

      const response = await empleoDeviozAPI.get("/auth/refrescar-token", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { access_token } = response.data;

      // Guardar el nuevo token en el localStorage
      localStorage.setItem("accessToken", access_token);

      return access_token;
    } catch (error) {
      handleLogOut();
      handleManagmentError((error as AxiosError) || (error as Error));
      return Promise.reject(error);
    }
  };

  const handleVerifyEmailDuplicate = async (email: string) => {
    try {
      const response = await empleoDeviozAPI.post("/auth/verificar-correo", {
        correo: email,
      });

      return {
        message: response,
        statusCode: response.status,
        ok: true,
      };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };


  return {
    handleLogOut,
    userResponse,
    isAuthenticated,
    handleAuthCompleteRegisterPostulant,
    handleAuthIncompleteRegisterPostulant,
    handleAuthLoginPostulant,
    refreshToken,
    //verifyToken,
    handleVerifyEmailDuplicate,
  };
};

export default useAuth;
