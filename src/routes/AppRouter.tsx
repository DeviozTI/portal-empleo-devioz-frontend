import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//import { PrivateRouter } from ".";
import { PrivateRoute } from "./PrivateRoute";
import {
  Home,
  Login,
  LoginAdmin,
  Register,
  ForgotPassword,
  ChangePassword,
  SearchJob,
  PersonalProfile,
  EmailVerification,
} from "../pages";
import { PrivateRouter } from "./PrivateRouter";
import ToastProvider from "../providers/ToastProvider";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <ToastProvider />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/iniciar-sesion" element={<Login />} />
        <Route path="/auth/registro" element={<Register />} />
        <Route path="/auth/recuperar-cuenta" element={<ForgotPassword />} />
        <Route path="/auth/cambiar-contrasena" element={<ChangePassword />} />
        <Route path="/auth/email" element={<EmailVerification />} />
        <Route path="/buscar-empleos" element={<SearchJob />} />
        <Route path="/mi-perfil" element={<PersonalProfile />} />
        {/* ADMIN */}
        <Route path="/admin/iniciar-sesion" element={<LoginAdmin />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <PrivateRouter />
            </PrivateRoute>
          }
        />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
