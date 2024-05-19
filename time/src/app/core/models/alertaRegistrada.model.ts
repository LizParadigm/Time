import { Dias } from "./dias.model"

export interface AlertaRegistrada {
    id_registro: number,
    titulo: string,
    reloj?: string,
    icono?: string,
    imagen?: string,
    cantidad?: string,
    duracion?: string,
    fecha?: string,
    inicia?: string,
    termina?: string,
    repetirMinutos?: number,
    repetirHoras?: number,
    notificarAntesMinutos?: number,
    notificarAntesHoras?: number,
    tono?: string,
    dias?: Dias,
    descripcion?: string
}