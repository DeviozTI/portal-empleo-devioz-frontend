import { AxiosError } from "axios";
import { empleoDeviozAPI } from "../api/empleoDeviozApi";
import { handleManagmentError } from "../helpers/HookManagmentError";

interface IVerifyEmailCode {
  correo_destino: string;
  codigo_verificacion: string;
}

const useEmail = () => {
  const handleSendEmailVerification = async (email: string) => {
    try {
      const response = await empleoDeviozAPI.post("/email/enviar-email", {
        correo_destino: email,
      });

      return {
        message: response.data.message,
        statusCode: response.status,
        ok: true,
      };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleVerifyEmailCode = async (dataForm: IVerifyEmailCode) => {
    try {
      const response = await empleoDeviozAPI.post(
        "/email/verificar-codigo",
        dataForm
      );

      return {
        message: response.data.message,
        statusCode: response.status,
        ok: true,
      };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleVerifyToken = async (accessToken: string) => {
    try {
      const response = await empleoDeviozAPI.get("/email/verificar-codigo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return {
        message: response.data.message,
        statusCode: response.status,
        email: response.data.email,
        isActive: response.data.isActive,
        ok: true,
      };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  return {
    handleSendEmailVerification,
    handleVerifyEmailCode,
    handleVerifyToken,
  };
};

export default useEmail;
