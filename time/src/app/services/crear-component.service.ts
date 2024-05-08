import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CrearComponentService {

  constructor(private router:Router) { }

  abrirComponenteCrear(seccion:string): void{
    this.router.navigate(['/crear-'+seccion]);
  }
}
