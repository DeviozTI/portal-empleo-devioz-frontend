import  { useState } from "react";
import PublicLayout from "../layouts/PublicLayout";
import {
  FaCode,
  FaDatabase,
  FaCloud,
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
} from "react-icons/fa";
import { Card } from "../components";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import recentOffers from "../seed/offers";
import OfferContent from "../components/public/OfferContent";
import { useForm, SubmitHandler } from "react-hook-form";
import { showInfoToast } from "../components/common/Toast";
import LocationSelect from "../components/public/LocationSelect";

interface ISearchForm {
  jobTitle: string;
  location: number; // Actualizado a int
}

const ubicaciones = [
  {
    departamento_id: 1,
    departamento_nombre: "Amazonas",
    provincias: [
      {
        provincia_id: 1,
        provincia_nombre: "Chachapoyas",
      },
      {
        provincia_id: 2,
        provincia_nombre: "Bagua",
      },
    ],
  },
  // Añadir más departamentos y provincias según sea necesario
];

const Home = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ISearchForm>();
  const [selectedOffer, setSelectedOffer] = useState(0);
  const chunkArray = (arr: any, chunkSize: any) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };
  const offerChunks = chunkArray(recentOffers, 8);

  const onSubmit: SubmitHandler<ISearchForm> = (data) => {
    if (data.jobTitle || data.location) {
      navigate("/buscar-empleos", {
        state: {
          jobTitle: data.jobTitle,
          location: data.location,
        },
      });
    } else {
      showInfoToast("Por favor, ingrese un título de trabajo o una ubicación");
    }
  };

  const handleLocationChange = (value: any) => {
    setValue("location", value);
  };

  return (
    <PublicLayout>
      <div className="relative py-32 text-black">
        <div className="absolute inset-0">
          <img
            src="https://storage.googleapis.com/portal-empleos-devioz-page/work.webp"
            alt="Background"
            className="object-cover w-full h-full opacity-80 animate-fade-in"
          />
          <div className="absolute inset-0 opacity-60 bg-gradient-to-b from-black to-transparent"></div>
        </div>
        <div className="container relative px-4 mx-auto text-center">
          <h1 className="mb-6 text-5xl font-bold text-white animate-fade-in">
            Encuentra tu Trabajo Ideal en Devioz Trabajos
          </h1>
          <p className="mb-12 text-2xl text-white animate-fade-in">
            Encuentra el empleo que encaja contigo, más de 43.176 ofertas disponibles
          </p>
          <div className="flex justify-center mb-12 space-x-4">
            <button className="px-6 py-3 font-semibold text-black transition duration-300 transform bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-100 active:scale-95 hover:scale-105">
              Ver Ofertas de Empleo
            </button>
            <button className="px-6 py-3 font-semibold text-white transition duration-300 transform bg-blue-900 rounded-full shadow-md cursor-pointer hover:bg-blue-800 active:scale-95 hover:scale-105">
              Publicar Vacante
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full p-4 space-y-4 md:flex-row md:justify-center md:space-x-4 md:space-y-0"
          >
            <div className="relative flex items-center w-full md:w-auto">
              <FaBriefcase className="absolute text-gray-500 left-4" />
              <label htmlFor="jobTitle" className="sr-only">
                Título del trabajo o palabra clave
              </label>
              <input
                type="text"
                id="jobTitle"
                placeholder="Título del trabajo o palabra clave"
                className={`w-full px-12 py-3 text-black placeholder-gray-600 transition duration-300 bg-white border ${
                  errors.jobTitle ? "border-red-500" : "border-gray-300"
                } rounded-full shadow-sm focus:outline-none focus:ring-2 ${
                  errors.jobTitle ? "focus:ring-red-500" : "focus:ring-blue-600"
                } focus:border-transparent`}
                {...register("jobTitle")}
              />
              {errors.jobTitle && (
                <span className="absolute text-red-500 left-4 top-14">
                  {String(errors.jobTitle.message)}
                </span>
              )}
            </div>
            <div className="relative flex items-center w-full md:w-auto">
              <FaMapMarkerAlt className="absolute text-gray-500 left-4" />
              <label htmlFor="location" className="sr-only">
                Ubicación
              </label>
              <LocationSelect
                locations={ubicaciones}
                onChange={handleLocationChange}
              />
              {errors.location && (
                <span className="absolute text-red-500 left-4 top-14">
                  {String(errors.location.message)}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="flex items-center px-6 py-3 font-semibold text-white transition duration-300 transform bg-blue-900 rounded-full shadow-md cursor-pointer md:w-auto hover:bg-blue-800 active:scale-95 hover:scale-105"
            >
              <FaSearch className="mr-2" />
              Buscar
            </button>
          </form>
        </div>
      </div>
      <main className="py-16 bg-gray-100">
        <div className="container px-4 mx-auto">
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-800 animate-fade-in">
              Áreas de especialización
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card
                title="Desarrollo Web"
                description="Crea aplicaciones web modernas y eficientes con las últimas tecnologías."
                icon={<FaCode className="w-12 h-12 text-blue-900" />}
              />
              <Card
                title="Administración de Bases de Datos"
                description="Gestiona y optimiza bases de datos para un acceso rápido y seguro."
                icon={<FaDatabase className="w-12 h-12 text-blue-900" />}
              />
              <Card
                title="Servicios en la Nube"
                description="Implementa soluciones escalables y seguras en la nube."
                icon={<FaCloud className="w-12 h-12 text-blue-900" />}
              />
            </div>
          </section>
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-800 animate-fade-in">
              ¿Qué ofrecemos?
            </h2>
            <div className="flex flex-wrap justify-center mb-8 space-x-4">
              {[
                "Creación de productos",
                "Herramientas de gestión",
                "Configuraciones de tienda",
                "Herramientas de promoción",
                "Comunidad de e-commerce",
              ].map((offer, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOffer(index)}
                  className={`px-6 py-3 mb-4 font-semibold text-black transition duration-300 transform rounded-full shadow-md cursor-pointer ${
                    selectedOffer === index
                      ? "bg-blue-900 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  } ${
                    selectedOffer === index
                      ? "hover:text-white"
                      : "hover:text-gray-900"
                  } active:scale-95`}
                >
                  {offer}
                </button>
              ))}
            </div>
            <OfferContent selectedOffer={selectedOffer} />
          </section>
          <section className="px-5 py-12 mb-12 bg-blue-50">
            <div className="container px-4 mx-auto text-center">
              <h2 className="mb-6 text-3xl font-bold text-gray-800">
                Si buscas trabajo ¡Devioz Trabajos es tu mejor aliado!
              </h2>
              <p className="mb-6 text-lg text-gray-700">
                Miles de ofertas de empleo están esperándote
              </p>
              <div className="flex flex-wrap justify-center space-x-4">
                <button className="px-6 py-3 font-semibold text-gray-800 transition bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-100 active:scale-95">
                  Encontrar empleo
                </button>
                <button
                  onClick={() => {
                    navigate("/registro");
                  }}
                  className="px-6 py-3 font-semibold text-white transition bg-gray-800 rounded-full shadow-md cursor-pointer hover:bg-gray-900 active:scale-95"
                >
                  Crea tu cuenta gratis
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-6 transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105">
                  <h3 className="mb-4 text-xl font-semibold text-gray-800">
                    Te ayudamos a encontrar un empleo mejor
                  </h3>
                  <p className="text-gray-700">
                    Haz que tu currículum sea visible para miles de empresas en
                    nuestra bolsa de trabajo.
                  </p>
                </div>
                <div className="p-6 transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105">
                  <h3 className="mb-4 text-xl font-semibold text-gray-800">
                    Registro gratuito
                  </h3>
                  <p className="text-gray-700">
                    Encuentra tu próximo trabajo hoy.
                  </p>
                </div>
                <div className="p-6 transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105">
                  <h3 className="mb-4 text-xl font-semibold text-gray-800">
                    Ofertas cada día
                  </h3>
                  <p className="text-gray-700">
                    Empleos que se ajustan a tu perfil.
                  </p>
                </div>
                <div className="p-6 transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105">
                  <h3 className="mb-4 text-xl font-semibold text-gray-800">
                    Alertas personalizadas
                  </h3>
                  <p className="text-gray-700">
                    Tú crea alertas de empleo y nosotros te avisaremos.
                  </p>
                </div>
                <div className="p-6 transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105">
                  <h3 className="mb-4 text-xl font-semibold text-gray-800">
                    Completa tu perfil
                  </h3>
                  <p className="text-gray-700">
                    Muéstrate profesional y ganarás visibilidad.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-800 animate-fade-in">
              Ofertas recientes
            </h2>
            <SwiperComponent
              modules={[Navigation, Pagination]}
              navigation
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              className="swiper-container"
            >
              {offerChunks.map((chunk, index) => (
                <SwiperSlide key={index}>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {chunk.map((offer: any, i: any) => (
                      <Card
                        key={i}
                        title={offer.title}
                        description={offer.description}
                        icon={offer.icon}
                      />
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </SwiperComponent>
          </section>
        </div>
      </main>
    </PublicLayout>
  );
};

export default Home;
