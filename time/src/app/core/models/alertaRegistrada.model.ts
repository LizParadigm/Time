import { Dias } from "./dias.model"

export interface AlertaRegistrada {
    id_alertaRegistrada: number,
    titulo: string,
    reloj?: string,
    icono?: string,
    imagen?: string,
    cantidad?: string,
    duracion?: {
        duracion1:number,
        duracion2:string
    },
    fecha?: string,
    inicia?: string,
    termina?: string,
    repetirMinutos?: number,
    repetirHoras?: number,
    notificarAntesMinutos?: number,
    notificarAntesHoras?: number,
    tono?: string,
    dias?: Dias,
    descripcion?: string;
}