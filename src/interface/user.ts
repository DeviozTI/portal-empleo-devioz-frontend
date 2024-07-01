export interface IDataUser {
  correo: string;
  nombres: string;
  apellidos: string;
  foto_perfil: string | null;
  cuenta_activa: boolean;
  distrito_id: number;
}

export interface IDataProfileUser {
  correo: string;
  nombres: string;
  apellidos: string;
  foto_perfil: string | null;
  cuenta_activa: boolean;
  distrito_id: number;
  distrito: string;
  departamento: string;
  provincia: string;
}
