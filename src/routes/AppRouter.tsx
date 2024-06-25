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
  DashboardAdmin,
  DataTableOffers,
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
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/admin/auth" element={<Login />} /> */}
        <Route path="/admin/iniciar-sesion" element={<LoginAdmin />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/dashboard/ofertas" element={<DataTableOffers />} />
        {/* <Route path="/products/:productId" element={<LazyProducts />} /> */}
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
