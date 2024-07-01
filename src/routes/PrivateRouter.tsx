import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "../components";
import React from "react";

const LazyDashboardLogin = React.lazy(
  () => import("../pages/admin/LoginAdmin")
);

const LazyDashboardHome = React.lazy(
  () => import("../pages/admin/DashboardAdmin")
);

const LazyDataTableOffers = React.lazy(
  () => import("../pages/admin/DataTableOffers")
);

export const PrivateRouter = () => {
  return (
    <Routes>
      <Route
        path="iniciar-sesion"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboardLogin />
          </Suspense>
        }
      />
      <Route
        path="principal"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboardHome />
          </Suspense>
        }
      />

      <Route
        path="ofertas"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDataTableOffers />
          </Suspense>
        }
      />

      <Route path="/*" element={<Navigate to="/admin/principal" />} />
    </Routes>
  );
};
