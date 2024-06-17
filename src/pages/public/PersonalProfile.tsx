import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import PublicLayout from "../../layouts/PublicLayout";

const data = [
  { name: "React", value: 15 },
  { name: "Node.js", value: 10 },
  { name: "TailwindCSS", value: 8 },
  { name: "MongoDB", value: 5 },
  { name: "JavaScript", value: 12 },
];

const trendData = [
  { month: "Jan", React: 10, NodeJS: 8, TailwindCSS: 6, JavaScript: 9 },
  { month: "Feb", React: 12, NodeJS: 9, TailwindCSS: 7, JavaScript: 10 },
  { month: "Mar", React: 15, NodeJS: 10, TailwindCSS: 8, JavaScript: 12 },
  { month: "Apr", React: 14, NodeJS: 9, TailwindCSS: 7, JavaScript: 11 },
  { month: "May", React: 16, NodeJS: 11, TailwindCSS: 9, JavaScript: 13 },
  { month: "Jun", React: 18, NodeJS: 12, TailwindCSS: 10, JavaScript: 14 },
];

const applicationsData = [
  { name: "Aplicado", value: 4 },
  { name: "CV Visto", value: 0 },
  { name: "En Proceso", value: 0 },
  { name: "Finalista", value: 0 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"];

const recommendedJobs = [
  { title: "Desarrollador Full Stack", company: "Tech Solutions", location: "Remoto" },
  { title: "Ingeniero de Software", company: "Innovatech", location: "Ciudad XYZ" },
  // Puedes añadir más trabajos recomendados aquí
];

const PersonalProfile = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="container flex flex-col items-start p-4 mx-auto space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <nav className="flex flex-col space-y-4 md:space-y-0 md:space-x-4 md:flex-row" aria-label="Main Navigation">
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-700">
                Mi área
              </a>
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-700">
                Mi currículum
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-700">
                Configuración
              </a>
            </div>
          </div>
        </header>
        <div className="container grid grid-cols-1 gap-6 p-6 mx-auto md:grid-cols-3">
          <aside className="p-4 bg-white rounded-lg shadow-lg md:col-span-1" aria-label="Sidebar">
            <div className="flex items-center mb-4">
              <img className="w-16 h-16 rounded-full" src="https://via.placeholder.com/64" alt="Profile" />
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">Sebastián Chaquila Muñoz</h2>
                <p className="text-gray-600">Sobre mí</p>
                <div className="flex mt-2 space-x-2">
                  <button className="px-4 py-2 text-white bg-blue-700 rounded-md">Acceder al CV</button>
                  <button className="px-4 py-2 text-blue-700 border border-blue-700 rounded-md">Diseñar CV</button>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="mb-2 font-semibold text-gray-800">Mis postulaciones</h3>
              <PieChart width={300} height={300}>
                <Pie
                  data={applicationsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {applicationsData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
            <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
              <h3 className="mb-2 font-semibold text-gray-800">Progreso del CV</h3>
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-blue-700 uppercase">80%</span>
                </div>
                <div className="w-full h-2 mb-4 overflow-hidden text-xs bg-blue-200 rounded">
                  <div className="flex flex-col justify-center w-full h-full bg-blue-500 shadow-none"></div>
                </div>
              </div>
              <div className="p-4 mt-4 rounded-lg shadow-md bg-blue-50">
                <h4 className="font-semibold text-gray-800">Consejos para mejorar tu CV</h4>
                <ul className="text-gray-600 list-disc list-inside">
                  <li>Actualiza tu experiencia laboral reciente.</li>
                  <li>Incluye habilidades relevantes a los trabajos que buscas.</li>
                  <li>Revisa la ortografía y gramática.</li>
                </ul>
              </div>
            </div>
          </aside>
        
          <main className="md:col-span-2">
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <h3 className="mb-4 font-semibold text-gray-800">Estadísticas del Perfil</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h4 className="mb-2 font-semibold text-gray-800">Habilidades más solicitadas</h4>
                  <div className="overflow-hidden">
                    <BarChart
                      width={320}
                      height={300}
                      data={data}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h4 className="mb-2 font-semibold text-gray-800">Tendencia de Solicitudes</h4>
                  <div className="overflow-hidden">
                    <LineChart
                      width={320}
                      height={300}
                      data={trendData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="React" stroke="#8884d8" />
                      <Line type="monotone" dataKey="NodeJS" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="TailwindCSS" stroke="#ffc658" />
                      <Line type="monotone" dataKey="JavaScript" stroke="#ff8042" />
                    </LineChart>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 mt-4 bg-white rounded-lg shadow-lg">
              <h3 className="mb-4 font-semibold text-gray-800">Trabajos Recomendados</h3>
              <ul className="space-y-2 overflow-y-auto max-h-96">
                {recommendedJobs.map((job, index) => (
                  <li key={index} className="p-4 rounded-lg shadow-md bg-blue-50">
                    <h4 className="text-lg font-semibold text-gray-800">{job.title}</h4>
                    <p className="mt-1 text-gray-600">Empresa: {job.company}</p>
                    <p className="mt-1 text-gray-600">Ubicación: {job.location}</p>
                    <button className="px-4 py-2 mt-2 text-white bg-blue-700 rounded-md">
                      Aplicar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </main>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PersonalProfile;
