import { Injectable } from '@angular/core';
import { ApiService } from '../simulacion/api.service';
import { usuario } from 'src/app/core/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api:ApiService
  ) { }

  validarCorreoExistente(correo:string): boolean {
    let existe=this.api.buscarCorreo(correo);
    if(existe){
      return true;
    }
    else{
      return false;
    }
  }

  validarContrasenaCorrecta(correo:string,contra:string):boolean{
    let correcta= this.api.comprobarContrasena(correo,contra);
    if(correcta){
      return true;
    }
    else{
      return false;
    }
  }

  ingresar(correo:string,contra:string) {
    console.log(correo, contra)
    let datosUsuario: any = this.api.obtenerUsuario(correo, contra);
    if (datosUsuario === 'no encontrado'){
      return [false, [] ];
    }
    else{
      return [true, datosUsuario]
    }
  }

  registrar(user:JSON): boolean {
    let usuarioCreado:boolean=true;
    console.log('datos del nuevo usuario: ', user)
    return usuarioCreado
  }
}
