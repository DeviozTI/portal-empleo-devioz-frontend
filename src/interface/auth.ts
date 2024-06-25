//LOGIN REQUEST
export interface IFormLoginRequest {
  correo: string;
  contrasenia: string;
  isCompany?: boolean;
}

//REGISTER REQUEST
export interface IFormRegisterPostulant {
  correo: string;
  contrasenia: string;
  nombres: string;
  apellidos: string;
  genero: string;
  fecha_nacimiento: string; // Formato: DD-MM-AAAA
  distrito: string;
  celular: string;
  tipo_documento: string;
  numero_documento: string;
  confirmContrasenia: string;
  codigoVerificacion: string;
  departamento: string;
  provincia: string;
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
}

export interface IResponseUser {
  access_token: string;
  dataUser?: IDataUser;
  // dataUser?: any;
  isCompany: boolean;
  message: string;
}

export interface IDataUser {
  correo: string;
  nombres: string;
  apellidos: string;
  foto_perfil: string | null;
  cuenta_activa: boolean;
  distrito_id: number;
}
