//LOGIN REQUEST
export interface IFormLoginRequest {
  correo: string;
  contrasenia: string;
  isCompany: boolean;
}

//REGISTER REQUEST
export interface IFormRegisterPostulant {
  correo: string;
  contrasenia: string;
  nombres: string;
  apellidos: string;
  genero_id: number;
  fecha_nacimiento: string; // Suponiendo que formatFechaNacimiento devuelve un string
  distrito_id: number;
  celular: string;
  tipo_documento_id: number;
  numero_documento: string;
}

export interface IFormIncompleteRegisterUserRequest {
  correo: string;
}

//REGISTER RESPONSE
export interface IFormRegisterPostulantRequest {
  correo: string;
  contrasenia: string;
  nombres: string;
  apellidos: string;
  genero_id: number;
  fecha_nacimiento: string;
  distrito_id: number;
  celular: string;
  tipo_documento_id: number;
  numero_documento: string;
  isCompany: boolean;
  rol_id: number;
}

export interface IFormRegisterPostulantRequestForm {
  correo: string;
  contrasenia: string;
  nombres: string;
  apellidos: string;
  genero_id: number;
  fecha_nacimiento: string;
  distrito_id: number;
  departamento_id: number;
  provincia_id: number;
  confirmContrasenia: string;
  celular: string;
  tipo_documento_id: number;
  numero_documento: string;
  isCompany: boolean;
}