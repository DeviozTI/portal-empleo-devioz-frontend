import { AxiosError } from "axios";
import { handleManagmentError } from "../helpers/HookManagmentError";
import { empleoDeviozAPI } from "../api/empleoDeviozApi";
import { useState } from "react";

const useUbication = () => {
  const [departments, setDepartments] = useState([] as any[]);
  const [provinces, setProvinces] = useState([] as any[]);
  const [districts, setDistricts] = useState([] as any[]);

  const handleGetDepartments = async () => {
    try {
      const response = await empleoDeviozAPI.get("/ubicacion/departamentos");

      setDepartments(response.data);
      return;
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleGetProvinceByIdDepartment = async (idDepartment: number) => {
    try {
      const response = await empleoDeviozAPI.get(
        `/ubicacion/provincias/${idDepartment}`
      );

      setProvinces(response.data);
      return;
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleGetDistrictByIdProvinceAndIdDepartment = async (
    idProvince: number,
    idDepartment: number
  ) => {
    try {
      const response = await empleoDeviozAPI.get(
        `/ubicacion/distritos/${idProvince}/${idDepartment}`
      );

      setDistricts(response.data);
      return;
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  return {
    departments,
    provinces,
    districts,
    handleGetDepartments,
    handleGetProvinceByIdDepartment,
    handleGetDistrictByIdProvinceAndIdDepartment,
  };
};

export default useUbication;
