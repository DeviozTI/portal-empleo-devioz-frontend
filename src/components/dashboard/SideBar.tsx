import { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const navOptions = [
  {
    href: "/admin/dashboard/",
    icon: <FaTachometerAlt />,
    label: "Principal",
  },
  {
    href: "/admin/dashboard/ofertas/",
    icon: <FaUsers />,
    label: "Ofertas",
  },
  {
    href: "/admin/dashboard/configuracion/",
    icon: <FaCog />,
    label: "Configuración",
  },
  {
    href: "/logout",
    icon: <FaSignOutAlt />,
    label: "Logout",
  },
];

interface SideBarProps {
  children: React.ReactNode;
}

export const SideBar = ({ children }: SideBarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
      <div className="relative flex-1 ml-20">
        {children}
      </div>
    </div>
  );
};
