import { AlertaConfiguracion } from "./alertaConfiguracion.model";
import { AlertaRegistrada } from "./alertaRegistrada.model";

export interface TipoAlertas {
    id_tipoAlerta: number;
    nombre: string;
    configuracion: AlertaConfiguracion,
    registradas: AlertaRegistrada
}