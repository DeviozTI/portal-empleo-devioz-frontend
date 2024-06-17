import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/public/Navbar";
import { Footer } from "../components";
import useAuth from "../hooks/useAuth";
import ButtonsSocial from "../components/public/ButtonsSocial";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {isAuthenticated === true || location.pathname === "/" ? <Navbar /> : null }
      <ButtonsSocial />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
