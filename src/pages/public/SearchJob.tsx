import { useState, useEffect } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import "tailwindcss/tailwind.css";
import { Job, jobResultsJson } from "../../seed/offersActive";
import { showInfoToast } from "../../components/common/Toast";

const SearchJob = () => {
  const [jobResults] = useState(jobResultsJson);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    salaryRange: "",
    datePosted: "",
    modality: "",
  });
  const jobsPerPage = 5;

  useEffect(() => {
    if (jobResults.length > 0 && window.innerWidth >= 768) {
      setSelectedJob(jobResults[0]);
    } else {
      setSelectedJob(null);
    }
  }, [jobResults]);

  useEffect(() => {
    if (selectedJob && window.innerWidth < 768) {
      setIsModalOpen(true);
    }
  }, [selectedJob]);

  const handleSearch = () => {
    if (searchTerm === "" && filters.location === "") {
      showInfoToast("Ingrese un término de búsqueda o una ubicación.");
    } else {
      console.log(searchTerm, filters);
    }
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobResults.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-100">
        <main className="container p-4 py-[4rem] mx-auto">
          {/* Sección introductoria */}
          <div className="relative mb-8 text-center ">
            <h1 className="text-3xl font-bold text-gray-800">
              Busca Tu Trabajo Ideal
            </h1>
            <p className="mt-2 text-gray-600">
              Encuentra las mejores ofertas laborales según tus preferencias.
            </p>
          </div>

          {/* Buscador de Ofertas Laborales */}
          <div className="mb-6">
            <div className="flex flex-col gap-4 mx-auto md:flex-row md:w-1/2">
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  id="nombreTrabajo"
                  className="p-2 mt-1 transition-all duration-300 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="Ingrese el nombre del trabajo"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full">
                <select
                  title="Ubicación"
                  id="ubicacion"
                  className="p-2 mt-1 transition-all duration-300 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                >
                  <option value="">Todas las ubicaciones</option>
                  <option value="Lima">Lima</option>
                  <option value="Piura">Piura</option>
                  <option value="Ucayali">Ucayali</option>
                </select>
              </div>
              <div className="flex flex-col justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white transition-transform transform bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105"
                  onClick={handleSearch}
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-col gap-4 mx-auto mb-6 md:flex-row">
            <div className="flex flex-col w-full">
              <label htmlFor="tipoJornada" className="text-gray-700">
                Tipo de Jornada
              </label>
              <select
                id="tipoJornada"
                className="p-2 mt-1 transition-all duration-300 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              >
                <option value="">Cualquier jornada</option>
                <option value="Tiempo Completo">Tiempo Completo</option>
                <option value="Medio Tiempo">Medio Tiempo</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="sueldo" className="text-gray-700">
                Sueldo
              </label>
              <select
                id="sueldo"
                className="p-2 mt-1 transition-all duration-300 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                value={filters.salaryRange}
                onChange={(e) =>
                  setFilters({ ...filters, salaryRange: e.target.value })
                }
              >
                <option value="">Cualquier sueldo</option>
                <option value="S/. 1,000 - S/. 2,000">
                  S/. 1,000 - S/. 2,000
                </option>
                <option value="S/. 2,000 - S/. 3,000">
                  S/. 2,000 - S/. 3,000
                </option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="publicado" className="text-gray-700">
                Hace cuánto se publicó
              </label>
              <select
                id="publicado"
                className="p-2 mt-1 transition-all duration-300 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                value={filters.datePosted}
                onChange={(e) =>
                  setFilters({ ...filters, datePosted: e.target.value })
                }
              >
                <option value="">Cualquier fecha</option>
                <option value="Última hora">Última hora</option>
                <option value="Último día">Último día</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="modalidad" className="text-gray-700">
                Modalidad
              </label>
              <select
                id="modalidad"
                className="p-2 mt-1 transition-all duration-300 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                value={filters.modality}
                onChange={(e) =>
                  setFilters({ ...filters, modality: e.target.value })
                }
              >
                <option value="">Cualquier modalidad</option>
                <option value="Presencial">Presencial</option>
                <option value="Remoto">Remoto</option>
              </select>
            </div>
          </div>

          {/* Resultados y descripción */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr,2fr]">
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="mb-4 text-xl font-semibold text-gray-700">
                  Resultados de la búsqueda
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {currentJobs.length > 0 ? (
                    currentJobs.map((job, index) => (
                      <div
                        key={index}
                        className={`p-4 cursor-pointer transition-all duration-300 rounded-lg shadow-lg bg-white border ${
                          selectedJob === job
                            ? "bg-blue-100 border-blue-500"
                            : "hover:bg-gray-100 border-gray-200"
                        }`}
                        onClick={() => setSelectedJob(job)}
                      >
                        <h3 className="text-lg font-semibold text-gray-800">
                          {job.title}
                        </h3>
                        <p className="text-gray-600">{job.location}</p>
                        <p className="text-gray-500">{job.date}</p>
                        {job.salary && (
                          <p className="text-gray-600">{job.salary}</p>
                        )}
                        {job.rating > 0 && (
                          <p className="text-gray-600">Rating: {job.rating}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">
                      No se encontraron ofertas laborales.
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  className={`flex items-center px-4 py-2 mx-2 font-semibold text-white rounded-lg transition-all duration-300 ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft className="mr-2" /> Anterior
                </button>
                <button
                  className={`flex items-center px-4 py-2 mx-2 font-semibold text-white rounded-lg transition-all duration-300 ${
                    indexOfLastJob >= jobResults.length
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={() => paginate(currentPage + 1)}
                  disabled={indexOfLastJob >= jobResults.length}
                >
                  Siguiente <FaChevronRight className="ml-2" />
                </button>
              </div>
            </div>
            {selectedJob && window.innerWidth >= 768 && (
              <div className="p-4 transition-all duration-300 ease-in-out transform bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-semibold text-gray-700">
                  Descripción de la oferta laboral
                </h2>
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectedJob.title}
                </h3>
                <p className="text-gray-600">{selectedJob.company}</p>
                <p className="text-gray-600">{selectedJob.location}</p>
                <p className="text-gray-600">{selectedJob.date}</p>
                {selectedJob.salary && (
                  <p className="text-gray-600">{selectedJob.salary}</p>
                )}
                {selectedJob.rating > 0 && (
                  <p className="text-gray-600">Rating: {selectedJob.rating}</p>
                )}
                <p className="mt-4 text-gray-700">{selectedJob.description}</p>
              </div>
            )}
          </div>
        </main>
        {isModalOpen && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out bg-black bg-opacity-50">
            <div className="relative w-11/12 p-4 transition-all duration-300 ease-in-out transform bg-white rounded-lg shadow-lg md:w-1/2 lg:w-1/3">
              <button
                title="Cerrar"
                className="absolute top-0 right-0 p-2 text-xl text-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes />
              </button>
              <h2 className="mb-4 text-xl font-semibold text-gray-700">
                Descripción de la oferta laboral
              </h2>
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedJob.title}
              </h3>
              <p className="text-gray-600">{selectedJob.company}</p>
              <p className="text-gray-600">{selectedJob.location}</p>
              <p className="text-gray-600">{selectedJob.date}</p>
              {selectedJob.salary && (
                <p className="text-gray-600">{selectedJob.salary}</p>
              )}
              {selectedJob.rating > 0 && (
                <p className="text-gray-600">Rating: {selectedJob.rating}</p>
              )}
              <p className="mt-4 text-gray-700">{selectedJob.description}</p>
              <button
                className="w-full px-4 py-2 mt-4 font-semibold text-white transition-transform transform bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105"
                onClick={() => setIsModalOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
};

export default SearchJob;
