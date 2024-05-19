import { Injectable } from '@angular/core';
import * as data from '@data/usuarios.json'
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

  obtenerUsuario(correo:string, contra:string): usuario | string{
    const { usuarios }: any = (data as any).default;
    let datosUsuario!: usuario;
    let error!: string;
    usuarios.forEach((usuario:usuario) => {
      if (usuario.correo === correo && usuario.contraseña === contra) {
        datosUsuario=usuario;
        error='';
        return;
      }
      else{
        error='no encontrado';
      }
    });
    if(error === ''){
      return datosUsuario;
    }
    else{
      return error
    }
  }

  obtenerReloj(hora:string):string{
    let reloj:string;
    reloj='assets/media/relog-vacio.png';
    return reloj;
  }
}
