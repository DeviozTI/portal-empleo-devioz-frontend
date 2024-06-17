export const Footer = () => {
  return (
    <footer className="py-10 text-white bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap justify-between mb-8 space-y-6 md:space-y-0">
          <div className="w-full md:w-1/3">
            <h3 className="text-2xl font-semibold text-center md:text-left">
              Devioz Trabajos
            </h3>
            <p className="mt-2 text-center text-gray-400 md:text-left">
              Encuentra las mejores oportunidades laborales y postula hoy mismo.
            </p>
          </div>
          <div className="w-full text-center md:w-1/3 md:text-left">
            <h4 className="text-xl font-semibold text-center">
              Áreas Destacadas
            </h4>
            <div className="flex flex-wrap justify-center mt-2 space-x-4 ">
              <a
                href="#"
                className="font-bold text-blue-400 transition-all duration-300 ease-in-out hover:text-blue-500 hover:underline"
              >
                Desarrollo
              </a>
              <a
                href="#"
                className="font-bold text-blue-400 transition-all duration-300 ease-in-out hover:text-blue-500 hover:underline"
              >
                DevOps
              </a>
              <a
                href="#"
                className="font-bold text-blue-400 transition-all duration-300 ease-in-out hover:text-blue-500 hover:underline"
              >
                Data
              </a>
              <a
                href="#"
                className="font-bold text-blue-400 transition-all duration-300 ease-in-out hover:text-blue-500 hover:underline"
              >
                Cloud
              </a>
            </div>
          </div>
          <div className="w-full text-center md:w-1/3 md:text-right">
            <h4 className="text-xl font-semibold">Enlaces</h4>
            <div className="flex flex-wrap justify-center mt-2 space-x-4 md:justify-end">
              <a
                href="#"
                className="text-gray-400 transition-all duration-300 ease-in-out hover:text-gray-200 hover:underline"
              >
                Política de Privacidad
              </a>
              <a
                href="#"
                className="text-gray-400 transition-all duration-300 ease-in-out hover:text-gray-200 hover:underline"
              >
                Términos de Servicio
              </a>
              <a
                href="#"
                className="text-gray-400 transition-all duration-300 ease-in-out hover:text-gray-200 hover:underline"
              >
                Contacto
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between pt-6 mt-6 border-t border-gray-700">
          <p className="w-full text-center md:text-left md:w-auto">
            © 2024 Devioz Trabajos. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center w-full mt-4 space-x-4 md:mt-0 md:w-auto">
            <a
              href="#"
              className="transition-all duration-300 ease-in-out hover:text-blue-400"
            >
              Facebook
            </a>
            <a
              href="#"
              className="transition-all duration-300 ease-in-out hover:text-blue-400"
            >
              Twitter
            </a>
            <a
              href="#"
              className="transition-all duration-300 ease-in-out hover:text-blue-400"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="transition-all duration-300 ease-in-out hover:text-blue-400"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
