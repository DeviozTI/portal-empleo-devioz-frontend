import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import { useForm } from "react-hook-form";
import { Loader } from "../../components";
import { IFormIncompleteRegisterUserRequest } from "../../interface/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from "../../components/common/Toast";
import useAuth from "../../hooks/useAuth";
import useEmail from "../../hooks/useEmail";

const Register = () => {
  const navigate = useNavigate();
  const { handleSendEmailVerification } = useEmail();
  const { handleAuthIncompleteRegisterUser } = useAuth();
  const [counterSendEmailCode, setCounterSendEmailCode] = useState(60);
  const [isButtonSendEmailCodeDisabled, setIsButtonSendEmailCodeDisabled] =
    useState(false);
  const [stage, setStage] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isLoadingLoadData, setIsLoadingLoadData] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormIncompleteRegisterUserRequest>();

  const onVerifyEmailDuplicate = async (email: string) => {
    setIsLoadingLoadData(true);
    const { message, ok } = await handleAuthIncompleteRegisterUser(email);
    if (ok) {
      showInfoToast(message);
      setStage(2);
      setIsLoadingLoadData(false);
      return;
    }

    showErrorToast(message);
  };

  const onSubmit = async (data: IFormIncompleteRegisterUserRequest) => {
    if (stage === 1) {
      await onVerifyEmailDuplicate(data.correo);
    }
  };

  const onSendEmailCode = async (correo: string) => {
    setIsLoadingLoadData(true);
    const { message, ok } = await handleSendEmailVerification(correo);
    if (ok) {
      showSuccessToast(message);
      setIsLoadingLoadData(false);
      setCounterSendEmailCode(60);
      setIsButtonSendEmailCodeDisabled(true);

      const timer = setInterval(() => {
        setCounterSendEmailCode((prevCounter) => {
          if (prevCounter === 1) {
            clearInterval(timer);
            setIsButtonSendEmailCodeDisabled(false);
            return prevCounter - 1;
          } else {
            return prevCounter - 1;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }

    showErrorToast(message);
  };

  useEffect(() => {
    const imgUrls = [
      "https://storage.googleapis.com/portal-empleos-devioz-page/hand-using-laptop-and-press-screen-to-search-browsing-on-the-internet-online-scaled-e1623761830625.jpg",
    ];

    const imagesLoadedState = imgUrls.map(() => false);

    const loadImage = (index: any) => {
      const img = new Image();
      img.onload = () => {
        imagesLoadedState[index] = true;
        if (imagesLoadedState.every((loaded) => loaded)) {
          setImagesLoaded(true);
        }
      };
      img.src = imgUrls[index];
    };

    imgUrls.forEach((_, index) => loadImage(index));
  }, []);

  useEffect(() => {
    if (stage === 2) {
      setCounterSendEmailCode(60);
      setIsButtonSendEmailCodeDisabled(true);

      const timer = setInterval(() => {
        setCounterSendEmailCode((prevCounter) => {
          if (prevCounter === 1) {
            clearInterval(timer);
            setIsButtonSendEmailCodeDisabled(false);
            return prevCounter - 1;
          } else {
            return prevCounter - 1;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [stage]);

  if (!imagesLoaded || isLoadingLoadData) {
    return <Loader />;
  }

  return (
    <PublicLayout>
      <div className="relative flex items-center justify-center min-h-screen py-12 text-white bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="https://storage.googleapis.com/portal-empleos-devioz-page/hand-using-laptop-and-press-screen-to-search-browsing-on-the-internet-online-scaled-e1623761830625.jpg"
            alt="Background"
            className="object-cover w-full h-full opacity-50 animate-fade-in"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative z-10 w-full max-w-md px-6">
          <div className="p-8 bg-white rounded-lg shadow-xl bg-opacity-80 backdrop-blur-sm">
            <h2 className="mb-6 text-3xl font-semibold text-center text-gray-900 animate-fade-in">
              Registrarse
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {stage === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      {...register("correo", {
                        required: "El correo electrónico es obligatorio",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: "Formato de correo electrónico inválido",
                        },
                      })}
                      placeholder="Ingresa tu correo electrónico"
                      className={`w-full px-4 py-2 text-black placeholder-gray-500 transition duration-300 ease-in-out bg-white border rounded-lg ${
                        errors.correo ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:border-blue-500`}
                    />
                    {errors.correo && (
                      <p className="mt-1 text-sm text-red-500">
                        {String(errors.correo.message)}
                      </p>
                    )}
                  </div>
                </>
              )}
              {stage === 2 && (
                <>
                  <div className="text-center">
                    <h2 className="mb-2 text-xl font-semibold text-gray-800">
                      Confirmación de correo
                    </h2>
                    <div className="mb-4 text-gray-600">
                      <p>Hemos enviado un correo de confirmación a</p>
                      <p>
                        <strong>{watch("correo")}</strong>
                      </p>
                      <p className="mt-8">
                        Revisa tu bandeja de entrada y sigue las instrucciones.
                      </p>
                      <p>
                        Si no encuentras el correo, revisa tu bandeja de spam.
                      </p>
                    </div>
                    <button
                      type="button"
                      className={`w-full py-2 mt-4 text-white transition duration-300 ease-in-out rounded-lg focus:outline-none ${
                        isButtonSendEmailCodeDisabled
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-black hover:bg-gray-800 focus:bg-gray-800"
                      }`}
                      onClick={() => {
                        onSendEmailCode(watch("correo"));
                      }}
                      disabled={isButtonSendEmailCodeDisabled}
                    >
                      {isButtonSendEmailCodeDisabled
                        ? `Reenviar correo (${counterSendEmailCode}s)`
                        : "Reenviar correo"}
                    </button>
                  </div>
                </>
              )}
              {stage === 1 && (
                <button
                  type="submit"
                  className="w-full py-2 text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Siguiente
                </button>
              )}

              <p className="mt-4 text-center text-gray-700">
                ¿Ya tienes una cuenta?{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => navigate("/auth/iniciar-sesion")}
                >
                  Inicia sesión
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </PublicLayout>
  );
};

export default Register;
