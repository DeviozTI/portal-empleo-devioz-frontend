import { useState } from "react";
import { FaUser, FaUserCircle, FaSignOutAlt, FaFileAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useAtom } from "jotai";
import { userResponseAtom } from "../../store/user";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { handleLogOut, isAuthenticated } = useAuth();
  const [userResponse] = useAtom(userResponseAtom);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const onLogOut = () => {
    handleLogOut();
    setDropdownOpen(false);
  };

  const menuItems = [
    {
      label: `${userResponse?.nombres} ${userResponse?.apellidos}`,
      icon: FaUser,
      href: "#",
    },
    {
      label: "Mi perfil",
      icon: FaUserCircle,
      href: "mi-perfil",
    },
    {
      label: "Mi CV",
      icon: FaFileAlt,
      href: "#",
    },
    {
      label: "Cerrar Sesión",
      icon: FaSignOutAlt,
      onClick: onLogOut,
      href: "#",
    },
  ];

  return (
    <nav className="top-0 z-20 w-full bg-gray-900 border-b border-gray-700">
      <div className="flex items-center justify-between max-w-screen-xl p-4 py-5 mx-auto">
        <a
          href="/"
          className="flex items-center space-x-3 transition-all duration-300 ease-in-out hover:text-blue-400"
        >
          <img
            src="https://storage.googleapis.com/portal-empleos-devioz-page/devioz-logo-1.png"
            className="transition-all duration-300 ease-in-out h-9 hover:scale-110"
            alt="Devioz Logo"
          />
          <span className="self-center text-xl font-semibold text-white">
            Devioz Trabajos
          </span>
        </a>
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <div className="relative">
              <div className="flex items-center gap-6">
                <a
                  href="/mis-postulaciones"
                  className="text-lg text-white transition-all duration-300 ease-in-out hover:text-gray-300"
                >
                  Mis postulaciones
                </a>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center text-sm transition-all duration-300 ease-in-out bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 hover:bg-gray-700"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        userResponse?.foto_perfil
                          ? userResponse?.foto_perfil
                          : "https://storage.googleapis.com/portal-empleos-devioz-page/WhatsApp%20Image%202024-05-30%20at%203.40.35%20PM.jpeg"
                      }
                      alt="user avatar"
                    />
                  </button>
                </div>
              </div>
              <div
                className={`absolute right-0 z-10 w-56 py-2 mt-2 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${
                  dropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
                style={{
                  visibility: dropdownOpen ? "visible" : "hidden",
                }}
              >
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={item.onClick}
                    className="flex items-center px-4 py-2 text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-100"
                  >
                    <item.icon className="mr-2" />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth/iniciar-sesion")}
              className="py-2 font-semibold text-white transition duration-300 transform bg-blue-900 rounded-full shadow-md cursor-pointer px-7 hover:bg-blue-800 active:scale-95 hover:scale-105"
            >
              Iniciar Sesión
              <span className="absolute inset-0 w-full h-full bg-blue-800 rounded-full opacity-0 hover:opacity-20"></span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
