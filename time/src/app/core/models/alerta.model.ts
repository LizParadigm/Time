export interface Alerta {
    seccionId: number;
    titulo?: string;
    reloj?: string;
    icono?: string;
    imagen?: string;
    cantidad?: string;
    duracion?: {
        duracion1?: number;
        duracion2?: string;
    };
    fecha?: string;
    inicia?: string;
    termina?: string;
    repetirMinutos?: number;
    repetirHoras?: number;
    notificarAntesMinutos?: number;
    notificarAntesHoras?: number;
    tono?: string;
    dias?: {
        lunes?: boolean;
        martes?: boolean;
        miercoles?: boolean;
        jueves?: boolean;
        viernes?: boolean;
        sabado?: boolean;
        domingo?: boolean;
    };
    descripcion?: string;
}


