import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PublicLayout from "../../layouts/PublicLayout";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Loader } from "../../components";
import useAuth from "../../hooks/useAuth";
import { IFormLoginRequest } from "../../interface/auth";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/common/Toast";

const Login = () => {
  const navigate = useNavigate();
  const { handleAuthLogin } = useAuth();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoadingLoadData, setIsLoadingLoadData] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLoginRequest>();

  const onLogin = async (dataForm: IFormLoginRequest) => {
    setIsLoadingLoadData(true);

    const { ok, message } = await handleAuthLogin({
      ...dataForm,
      isCompany: false,
    });

    if (ok) {
      showSuccessToast(message);
      setTimeout(() => {
        navigate("/");
      }, 2500);

      return;
    }

    setIsLoadingLoadData(false);

    showErrorToast(message);
  };

  useEffect(() => {
    const imgUrls = [
      "https://storage.googleapis.com/portal-empleos-devioz-page/regist.jpg",
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

  if (!imagesLoaded || isLoadingLoadData) {
    return <Loader />;
  }

  return (
    <PublicLayout>
      <div className="relative flex items-center justify-center min-h-screen py-12 text-white bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="https://storage.googleapis.com/portal-empleos-devioz-page/regist.jpg"
            alt="Background"
            className="object-cover w-full h-full opacity-50 animate-fade-in"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative z-10 w-full max-w-md px-6">
          <div className="p-8 bg-white rounded-lg shadow-xl bg-opacity-80 backdrop-blur-sm">
            <h2 className="mb-6 text-3xl font-semibold text-center text-gray-900 animate-fade-in">
              Iniciar Sesión
            </h2>
            <form onSubmit={handleSubmit(onLogin)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
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
                    {String(errors.correo.message)}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("contrasenia", {
                      required: "La contraseña es obligatoria",
                      minLength: {
                        value: 6,
                        message:
                          "La contraseña debe tener al menos 6 caracteres",
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
                    {String(errors.contrasenia.message)}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <a
                  onClick={() => navigate("/auth/recuperar-cuenta")}
                  className="text-sm text-blue-500 cursor-pointer hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <button
                type="submit"
                className="w-full py-3 font-semibold text-white transition duration-300 ease-in-out transform bg-blue-500 rounded-lg hover:bg-blue-600 hover:scale-105"
              >
                Iniciar Sesión
              </button>
            </form>
            <p className="mt-6 text-center text-gray-700">
              ¿No tienes una cuenta?{" "}
              <span
                onClick={() => {
                  navigate("/auth/registro");
                }}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Regístrate
              </span>
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Login;
