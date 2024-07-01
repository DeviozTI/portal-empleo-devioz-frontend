import { useState } from "react";
import { useForm } from "react-hook-form";
import PublicLayout from "../../layouts/PublicLayout";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { IFormLoginRequest } from "../../interface/auth";
import useAuth from "../../hooks/useAuth";
import { Loader } from "../../components";
import { useAtom } from "jotai";
import { userResponseAtom } from "../../store/user";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/common/Toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { handleAuthLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLoginRequest>();

  const onSubmit = async (data: IFormLoginRequest) => {
    setIsLoading(true);
    const { ok, message } = await handleAuthLogin({
      ...data,
      isCompany: true,
    });
    if (ok) {
      showSuccessToast(message);
      setTimeout(() => {
        navigate("/admin/principal");
      }, 2500);

      return;
    }

    setIsLoading(false);
    showErrorToast(message);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PublicLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="relative z-10 w-full max-w-md px-6 py-8 transition-all duration-300 ease-in-out transform bg-white rounded-lg shadow-xl bg-opacity-80 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center mb-4">
            <img
              src="https://storage.googleapis.com/portal-empleos-devioz-page/Logo.webp"
              alt="Logo"
              className="w-auto h-[7rem] mb-2"
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                type="email"
                {...register("correo", {
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
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
                  {errors.correo.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("contrasenia", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                  placeholder="Ingresa tu contraseña"
                  className={`w-full px-4 py-2 text-black placeholder-gray-500 transition duration-300 ease-in-out bg-white border rounded-lg ${
                    errors.contrasenia ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-blue-500`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoIosEyeOff className="w-5 h-5" />
                  ) : (
                    <IoIosEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.contrasenia && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.contrasenia.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-3 font-semibold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Iniciar Sesión
            </button>
          </form>
          {/* <p className="mt-6 text-center text-gray-700">
            ¿No tienes una cuenta?{" "}
            <span
              onClick={() => {
                navigate("/auth/registro");
              }}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Regístrate
            </span>
          </p> */}
        </div>
      </div>
    </PublicLayout>
  );
};

export default Login;
