import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as data from '@data/usuarios.json'
import { AlertaConfiguracion } from 'src/app/core/models/alertaConfiguracion.model';
import { usuario } from 'src/app/core/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  buscarCorreo(correo:string):boolean{
    const { usuarios }: any = (data as any);
    let existe: boolean = false;
    usuarios.forEach((usuario:usuario) => {
      if (usuario.correo === correo) {
        existe=true;
        return;
      }
    });
    return existe
  }

  comprobarContrasena(correo:string,contra:string):boolean{
    const { usuarios }: any = (data as any).default;
    let correcta:boolean = false;
    usuarios.forEach((usuario:usuario) => {
      if(usuario.contraseña === contra){
        correcta=true;
        return;
      }
    });
    return correcta;
  }

  obtenerUsuario(correo:string, contra:string): usuario{
    const { usuarios }: any = (data as any).default;
    let datosUsuario!: usuario;
    usuarios.forEach((usuario:usuario) => {
      if (usuario.correo === correo && usuario.contraseña === contra) {
        datosUsuario=usuario;
        return;
      }
    });
    return datosUsuario;
  }

  obtenerReloj(hora:string):string{
    let reloj:string;
    reloj='assets/media/relog-vacio.png';
    return reloj;
  }

  alertaDelete(id:number | null, seccion : number | null): boolean{
    let terminado: boolean = true;
    return terminado
  }

  modificarAlerta(correo:string, contra:string, seccion:number,id_alerta:number,configuracion:AlertaConfiguracion,datos:FormGroup):boolean{
    /*se envian los datos que la funcion recibe y se retorna un boolean indicando si el proceso fue un exito o no*/
    return true
  }

}
