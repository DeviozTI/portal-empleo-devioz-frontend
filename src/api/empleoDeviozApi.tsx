import axios from "axios";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

export const empleoDeviozAPI = axios.create({
  //baseURL: "https://devioz-page-job-portal-0000.portalempleos.devioz.com/api",
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

empleoDeviozAPI.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      console.log(token)
      const decodedToken: { exp: number } = jwtDecode(token);
      const expirationTime = decodedToken.exp;
      const currentTime = Date.now() / 1000;

      if (expirationTime - currentTime < 60 * 5) {
        try {
          const newToken = await useAuth().refreshToken();
          localStorage.setItem("accessToken", newToken);
          config.headers["Authorization"] = `Bearer ${newToken}`;
        } catch (error) {
          console.error("Error al refrescar el token", error);
          return Promise.reject(error);
        }
      } else {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
