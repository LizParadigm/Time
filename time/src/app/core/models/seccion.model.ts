import { seccionConfiguracion } from "./seccionConfiguracion.model"

export interface Seccion {
    id:number
    nombre:String
    configuration: seccionConfiguracion[]
    alertas?: []
}