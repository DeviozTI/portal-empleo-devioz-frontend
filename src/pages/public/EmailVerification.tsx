import { useLocation } from "react-router-dom";
import useEmail from "../../hooks/useEmail";
import { useEffect, useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import { useForm } from "react-hook-form";
import useUbication from "../../hooks/useUbication";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import { Loader } from "../../components";
import { showSuccessToast } from "../../components/common/Toast";
import { useNavigate } from "react-router-dom";
import { IFormRegisterPostulantRequestForm } from "../../interface/auth";
import { formatFechaNacimiento } from "../../utils/formatDate.utils";

const EmailVerification = () => {
  const { handleVerifyToken } = useEmail();
  const {
    departments,
    provinces,
    districts,
    handleGetDepartments,
    handleGetProvinceByIdDepartment,
    handleGetDistrictByIdProvinceAndIdDepartment,
  } = useUbication();
  const navigate = useNavigate();
  const { handleAuthCompleteRegisterPostulant } = useAuth();
  const [message, setMessage] = useState("Verificando token...");
  const [isValidToken, setIsValidToken] = useState(false);
  const [stage, setStage] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [, setSelectedProvince] = useState<number | null>(null);
  const [, setSelectedDistrict] = useState<number | null>(null);
  const [isProvinceDisabled, setIsProvinceDisabled] = useState(true);
  const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token") || "";
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormRegisterPostulantRequestForm>();

  const onVerifyToken = async (token: string) => {
    const { ok, message, email, isActive } = await handleVerifyToken(token);
    setMessage(message);
    setIsValidToken(ok);
    setEmail(email);
    if (isActive) {
      navigate("/login");
    }
    if (ok) {
      setStage(3);
    }
  };

  const onGetDepartments = async () => {
    await handleGetDepartments();
  };

  const onGetProvinces = async (idDepartment: number) => {
    await handleGetProvinceByIdDepartment(idDepartment);
  };

  const onGetDistricts = async (idProvince: number, idDepartment: number) => {
    await handleGetDistrictByIdProvinceAndIdDepartment(
      idProvince,
      idDepartment
    );
  };

  const password = watch("contrasenia");

  const onSubmit = async (data: IFormRegisterPostulantRequestForm) => {
    const formattedData = {
      correo: email,
      contrasenia: data.contrasenia,
      nombres: data.nombres,
      apellidos: data.apellidos,
      genero_id: Number(data.genero_id),
      fecha_nacimiento: formatFechaNacimiento(data.fecha_nacimiento),
      distrito_id: Number(data.distrito_id),
      celular: data.celular,
      tipo_documento_id: Number(data.tipo_documento_id),
      numero_documento: data.numero_documento,
      isCompany: false,
      rol_id: Role.POSTULANTE,
    };

    if (stage === 3) {
      if (data.contrasenia !== data.confirmContrasenia) {
        return;
      }
      setStage(4);
      return;
    }
    if (stage === 4) {
      await onGetDepartments();
      setStage(5);
      return;
    }
    if (stage === 5) {
      //console.log(formattedData);
      setIsLoading(true);
      const { message, ok } = await handleAuthCompleteRegisterPostulant(
        formattedData,
        token
      );

      if (ok) {
        showSuccessToast(message);
        navigate("/login");
        setIsLoading(false);
        return;
      }

      return;
    }
  };

  useEffect(() => {
    onVerifyToken(token);
  }, [token]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {isValidToken ? (
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
                  {stage === 3 && (
                    <>
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
                            placeholder="Crea una contraseña"
                            className={`w-full px-4 py-2 text-black placeholder-gray-500 transition duration-300 ease-in-out bg-white border rounded-lg ${
                              errors.contrasenia
                                ? "border-red-500"
                                : "border-gray-300"
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Confirmar Contraseña
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            {...register("confirmContrasenia", {
                              required: "Por favor confirma tu contraseña",
                              validate: (value) =>
                                value === password ||
                                "Las contraseñas no coinciden",
                            })}
                            placeholder="Repite tu contraseña"
                            className={`w-full px-4 py-2 text-black placeholder-gray-500 transition duration-300 ease-in-out bg-white border rounded-lg ${
                              errors.confirmContrasenia
                                ? "border-red-500"
                                : "border-gray-300"
                            } focus:outline-none focus:border-blue-500`}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <IoIosEyeOff className="w-5 h-5" />
                            ) : (
                              <IoIosEye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {errors.confirmContrasenia && (
                          <p className="mt-1 text-sm text-red-500">
                            {String(errors.confirmContrasenia.message)}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                  {stage === 4 && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Nombres
                        </label>
                        <input
                          type="text"
                          {...register("nombres", {
                            required: "El nombre es obligatorio",
                            minLength: {
                              value: 3,
                              message:
                                "El nombre debe tener al menos 3 caracteres",
                            },
                          })}
                          placeholder="Ingresa tus nombres"
                          className={`w-full px-4 py-2 text-black placeholder-gray-500 transition duration-300 ease-in-out bg-white border rounded-lg ${
                            errors.nombres
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:outline-none focus:border-blue-500`}
                        />
                        {errors.nombres && (
                          <p className="mt-1 text-sm text-red-500">
                            {String(errors.nombres.message)}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Apellidos
                        </label>
                        <input
                          type="text"
                          {...register("apellidos", {
                            required: "El apellido es obligatorio",
                            minLength: {
                              value: 3,
                              message:
                                "El apellido debe tener al menos 3 caracteres",
                            },
                          })}
                          placeholder="Ingresa tus apellidos"
                          className={`w-full px-4 py-2 text-black placeholder-gray-500 transition duration-300 ease-in-out bg-white border rounded-lg ${
                            errors.apellidos
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:outline-none focus:border-blue-500`}
                        />
                        {errors.apellidos && (
                          <p className="mt-1 text-sm text-red-500">
                            {String(errors.apellidos.message)}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Número de Celular
                        </label>
                        <input
                          type="tel"
                          {...register("celular", {
                            required: "El número de celular es obligatorio",
                            pattern: {
                              value: /^[0-9]{9}$/,
                              message:
                                "El número de celular debe tener 9 dígitos",
                            },
                          })}
                          placeholder="Ingresa tu número de celular"
                          className={`w-full px-4 py-2 text-black placeholder-gray-500 transition.duration-300 ease-in-out bg-white border rounded-lg ${
                            errors.celular
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:outline-none focus:border-blue-500`}
                        />
                        {errors.celular && (
                          <p className="mt-1 text-sm text-red-500">
                            {String(errors.celular.message)}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Tipo de Documento
                        </label>
                        <select
                          {...register("tipo_documento_id", {
                            required: "El tipo de documento es obligatorio",
                          })}
                          className={`w-full px-4 py-2 text-black placeholder-gray-500 transition duration-300 ease-in-out bg-white border rounded-lg ${
                            errors.tipo_documento_id
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:outline-none focus:border-blue-500`}
                        >
                          <option value="">
                            Selecciona tu tipo de documento
                          </option>
                          <option value="1">DNI</option>
                          <option value="2">Pasaporte</option>
                          <option value="3">Carnet de Extranjería</option>
                        </select>
                        {errors.tipo_documento_id && (
                          <p className="mt-1 text-sm text-red-500">
                            {String(errors.tipo_documento_id.message)}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Número de Documento
                        </label>
                        <input
                          type="text"
                          {...register("numero_documento", {
                            required: "El número de documento es obligatorio",
                            pattern: {
                              value: /^[0-9a-zA-Z]+$/,
                              message:
                                "Formato de número de documento inválido",
                            },
                          })}
                          placeholder="Ingresa tu número de documento"
                          className={`w-full px-4 py-2 text-black placeholder-gray-500 transition duration-300 ease-in-out bg-white border rounded-lg ${
                            errors.numero_documento
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:outline-none focus:border-blue-500`}
                        />
                        {errors.numero_documento && (
                          <p className="mt-1 text-sm text-red-500">
                            {String(errors.numero_documento.message)}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                  {stage === 5 && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Género
                        </label>
                        <select
                          {...register("genero_id", {
                            required: "El género es obligatorio",
                          })}
                          className={`w-full px-4 py-2 text-black placeholder-gray-500 transition duration-300 ease-in-out bg-white border rounded-lg ${
                            errors.genero_id
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:outline-none focus:border-blue-500`}
                        >
                          <option value="">Selecciona tu género</option>
                          <option value="1">Masculino</option>
                          <option value="2">Femenino</option>
                          <option value="3">Otro</option>
                        </select>
                        {errors.genero_id && (
                          <p className="mt-1 text-sm text-red-500">
                            {String(errors.genero_id.message)}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Fecha de Nacimiento
                        </label>
                        <input
                          type="date"
                          {...register("fecha_nacimiento", {
                            required: "La fecha de nacimiento es obligatoria",
                          })}
                          placeholder="Selecciona tu fecha de nacimiento"
                          className={`w-full px-4 py-2 text-black placeholder-gray-500 transition duration-300 ease-in-out bg-white border rounded-lg ${
                            errors.fecha_nacimiento
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:outline-none focus:border-blue-500`}
                        />
                        {errors.fecha_nacimiento && (
                          <p className="mt-1 text-sm text-red-500">
                            {String(errors.fecha_nacimiento.message)}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Departamento
                        </label>
                        <select
                          {...register("departamento_id", {
                            required: "El departamento es obligatorio",
                          })}
                          className={`w-full px-4 py-2 text-black placeholder-gray-500 transition duration-300 ease-in-out bg.white border rounded-lg ${
                            errors.departamento_id
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:outline-none focus:border-blue-500`}
                          onChange={(e) => {
                            const selectedDepartmentId = Number(e.target.value);
                            if (selectedDepartmentId > 0) {
                              setSelectedDepartment(selectedDepartmentId);
                              onGetProvinces(selectedDepartmentId);
                              setSelectedProvince(null);
                              setSelectedDistrict(null);
                              setIsProvinceDisabled(false);
                              setIsDistrictDisabled(true);
                            }
                          }}
                        >
                          <option value="">Selecciona tu departamento</option>
                          {departments.map((department) => (
                            <option
                              key={department.departamento_id}
                              value={department.departamento_id}
                            >
                              {department.departamento_nombre}
                            </option>
                          ))}
                        </select>
                        {errors.departamento_id && (
                          <p className="mt-1 text-sm text-red-500">
                            {String(errors.departamento_id.message)}
                          </p>
                        )}

                        <label className="block mt-4 text-sm font-medium text-gray-700">
                          Provincia
                        </label>

                        <select
                          {...register("provincia_id", {
                            required: "La provincia es obligatoria",
                          })}
                          className={`w-full px-4 py-2 text-black placeholder-gray-500 transition duration-300 ease-in-out bg-white border rounded-lg ${
                            errors.provincia_id
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:outline-none focus:border-blue-500`}
                          onChange={(e) => {
                            const selectedProvinceId = Number(e.target.value);
                            if (selectedProvinceId > 0) {
                              setSelectedProvince(selectedProvinceId);
                              setSelectedDistrict(null);
                              if (selectedDepartment !== null) {
                                onGetDistricts(
                                  selectedProvinceId,
                                  selectedDepartment
                                );
                                setIsDistrictDisabled(false);
                              }
                            }
                          }}
                          disabled={isProvinceDisabled}
                        >
                          <option value="">Selecciona tu provincia</option>
                          {provinces.map((province) => (
                            <option
                              key={province.provincia_id}
                              value={province.provincia_id}
                            >
                              {province.provincia_nombre}
                            </option>
                          ))}
                        </select>

                        {errors.provincia_id && (
                          <p className="mt-1 text-sm text-red-500">
                            {String(errors.provincia_id.message)}
                          </p>
                        )}

                        <label className="block mt-4 text-sm font-medium text-gray-700">
                          Distrito
                        </label>

                        <select
                          {...register("distrito_id", {
                            required: "El distrito es obligatorio",
                          })}
                          className={`w-full px-4 py-2 text-black placeholder-gray-500 transition duration-300 ease-in-out bg-white border rounded-lg ${
                            errors.distrito_id
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:outline-none focus:border-blue-500`}
                          onChange={(e) => {
                            setSelectedDistrict(Number(e.target.value));
                          }}
                          disabled={isDistrictDisabled}
                        >
                          <option value="">Selecciona tu distrito</option>
                          {districts.map((district) => (
                            <option
                              key={district.distrito_id}
                              value={district.distrito_id}
                            >
                              {district.distrito_nombre}
                            </option>
                          ))}
                        </select>
                        {errors.distrito_id && (
                          <p className="mt-1 text-sm text-red-500">
                            {String(errors.distrito_id.message)}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                  >
                    {stage === 3 ? "Siguiente" : "Registrarme"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </PublicLayout>
      ) : (
        <h1>{message}</h1>
      )}
    </div>
  );
};

export default EmailVerification;
