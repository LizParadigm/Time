import { TipoAlertas } from "./tipoAlerta.model";

export interface usuario {
    id_usuario: number;
    nombre: string;
    apellido: string;
    correo: string;
    contraseña: string;
    alertas: TipoAlertas;
}
