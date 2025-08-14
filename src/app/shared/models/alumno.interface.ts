export interface UsuarioResponse {
  id_usuario?: number;
  nombre: string;
  apellido: string;
  numero_control: string;
  usuario: string;
  email: string;
  contrasena: string;
  fecha_registro?: Date;
}