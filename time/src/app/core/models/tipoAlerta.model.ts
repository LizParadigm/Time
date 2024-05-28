import { AlertaConfiguracion } from "./alertaConfiguracion.model";
import { AlertaRegistrada } from "./alertaRegistrada.model";

export interface TipoAlerta {
    id_tipoAlerta: number;
    nombre: string;
    configuracion: AlertaConfiguracion;
    alertasRegistradas: AlertaRegistrada[];
}