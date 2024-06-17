import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PublicLayout from "../../layouts/PublicLayout";
import { Loader } from "../../components";

interface IFormForgotPasswordInput {
  email: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormForgotPasswordInput>();

  const onSubmit = (data: IFormForgotPasswordInput) => {
    console.log(data);
    // Aquí puedes manejar la lógica de recuperación de contraseña
    // navigate('/password-reset-confirmation');
  };

  useEffect(() => {
    const imgUrls = [
      "https://storage.googleapis.com/portal-empleos-devioz-page/M2WLNBZWX5EURKABDFGRYUG47U.jpg",
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
            src="https://storage.googleapis.com/portal-empleos-devioz-page/M2WLNBZWX5EURKABDFGRYUG47U.jpg"
            alt="Background"
            className="object-cover w-full h-full opacity-50 animate-fade-in"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative z-10 w-full max-w-md px-6">
          <div className="p-8 bg-white rounded-lg shadow-xl bg-opacity-80 backdrop-blur-sm">
            <h2 className="mb-6 text-3xl font-semibold text-center text-gray-900 animate-fade-in">
              Recuperar cuenta
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "El correo electrónico es obligatorio",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Formato de correo electrónico inválido",
                    },
                  })}
                  placeholder="Ingresa tu correo electrónico"
                  className={`w-full px-4 py-2 text-black placeholder-gray-500 transition duration-300 ease-in-out bg-white border rounded-lg ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-blue-500`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {String(errors.email.message)}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3 font-semibold text-white transition duration-300 ease-in-out transform bg-blue-500 rounded-lg hover:bg-blue-600 hover:scale-105"
              >
                Enviar Instrucciones
              </button>
            </form>
            <p className="mt-6 text-center text-gray-700">
              ¿Ya tienes una cuenta?{" "}
              <span
                onClick={() => {
                  navigate("/auth/iniciar-sesion");
                }}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Iniciar Sesión
              </span>
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ForgotPassword;
