import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import PublicLayout from "../../layouts/PublicLayout";
import { Loader } from "../../components";

interface IFormChangePasswordInput {
  verificationCode: string;
  password: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormChangePasswordInput>();

  const onSubmit = (data: IFormChangePasswordInput) => {
    console.log(data);
    // Aquí puedes manejar la lógica de cambio de contraseña
    // navigate('/password-reset-confirmation');
  };

  useEffect(() => {
    const imgUrls = [
      "https://storage.googleapis.com/portal-empleos-devioz-page/1500x844-job-sites.jpg",
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

  if (!imagesLoaded) {
    return <Loader />;
  }

  return (
    <PublicLayout>
      <div className="relative flex items-center justify-center min-h-screen py-12 text-white bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="https://storage.googleapis.com/portal-empleos-devioz-page/1500x844-job-sites.jpg"
            alt="Background"
            className="object-cover w-full h-full opacity-50 animate-fade-in"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative z-10 w-full max-w-md px-6">
          <div className="p-8 bg-white rounded-lg shadow-xl bg-opacity-80 backdrop-blur-sm">
            <h2 className="mb-6 text-3xl font-semibold text-center text-gray-900 animate-fade-in">
              Cambiar Contraseña
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Código de Verificación
                </label>
                <input
                  type="text"
                  {...register("verificationCode", {
                    required: "El código de verificación es obligatorio",
                  })}
                  placeholder="Ingresa el código de verificación"
                  className={`w-full px-4 py-2 text-black placeholder-gray-500 transition duration-300 ease-in-out bg-white border rounded-lg ${
                    errors.verificationCode
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:border-blue-500`}
                />
                {errors.verificationCode && (
                  <p className="mt-1 text-sm text-red-500">
                    {String(errors.verificationCode.message)}
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
                    {...register("password", {
                      required: "La contraseña es obligatoria",
                      minLength: {
                        value: 6,
                        message:
                          "La contraseña debe tener al menos 6 caracteres",
                      },
                    })}
                    placeholder="Crea una contraseña"
                    className={`w-full px-4 py-2 text-black placeholder-gray-500 transition duration-300 ease-in-out bg-white border rounded-lg ${
                      errors.password ? "border-red-500" : "border-gray-300"
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
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Por favor confirma tu contraseña",
                      validate: (value) =>
                        value === watch("password") ||
                        "Las contraseñas no coinciden",
                    })}
                    placeholder="Repite tu contraseña"
                    className={`w-full px-4 py-2 text-black placeholder-gray-500 transition duration-300 ease-in-out bg-white border rounded-lg ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:border-blue-500`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <IoIosEyeOff className="w-5 h-5" />
                    ) : (
                      <IoIosEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3 font-semibold text-white transition duration-300 ease-in-out transform bg-blue-500 rounded-lg hover:bg-blue-600 hover:scale-105"
              >
                Cambiar Contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ChangePassword;
