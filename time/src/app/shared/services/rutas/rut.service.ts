import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RutService {

  constructor(
    private router:Router
  ) { }

  cambiarTitulo():string{
    console.log(this.router.url)
    switch(this.router.url){
      case '/home':
        return 'Bienvenido';
      case '/home/seccion/alarmas':
        return 'Alarmas';
        default:
          return 'T I M E';
    }
  }
}
