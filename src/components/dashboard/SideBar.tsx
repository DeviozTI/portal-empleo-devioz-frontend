import { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const navOptions = [
  {
    id: 0,
    href: "/admin/principal/",
    icon: <FaTachometerAlt />,
    label: "Principal",
  },
  {
    id: 1,
    href: "/admin/ofertas/",
    icon: <FaUsers />,
    label: "Ofertas",
  },
  {
    id: 2,
    href: "/admin/configuracion/",
    icon: <FaCog />,
    label: "Configuración",
  },
  {
    id: 3,
    href: "/",
    icon: <FaSignOutAlt />,
    label: "Salir",
  },
];

interface SideBarProps {
  children: React.ReactNode;
}

export const SideBar = ({ children }: SideBarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { handleLogOut } = useAuth();

  const onLogout = (id: number) => {
    if (id === 3) {
      handleLogOut();
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex h-screen">
      <div
        className={`absolute top-0 left-0 h-full bg-gray-900 text-white shadow-lg z-20 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div
          className={`flex items-center h-24 px-4 border-b border-gray-700 ${
            isSidebarOpen ? "justify-between" : "justify-center"
          }`}
        >
          {isSidebarOpen && (
            <img
              src="/Logo.webp"
              alt="Logo"
              className="h-16 transition-transform duration-300 transform hover:scale-110"
            />
          )}
          <button
            onClick={toggleSidebar}
            className="w-auto text-white focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <nav className="flex-1 mt-10 space-y-2">
          {navOptions.map((option, index) => (
            <a
              key={index}
              href={option.href}
              onClick={() => onLogout(index)}
              className="flex items-center px-6 py-3 transition duration-300 ease-in-out transform rounded hover:bg-gray-700 hover:translate-x-2"
            >
              <div className="flex items-center justify-center w-8 h-8">
                {option.icon}
              </div>
              {isSidebarOpen && <span className="ml-4">{option.label}</span>}
            </a>
          ))}
        </nav>
      </div>
      <div className="relative flex-1 ml-20">{children}</div>
    </div>
  );
};
