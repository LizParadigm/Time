import { Component, OnInit } from '@angular/core';
import { ApiService } from '@shared/services/simulacion/api.service';
import { AlertaConfiguracion } from 'src/app/core/models/alertaConfiguracion.model';
import { usuario } from 'src/app/core/models/usuario.model';

@Component({
  selector: 'app-alarmas-page',
  templateUrl: './alarmas-page.component.html',
  styleUrl: './alarmas-page.component.css'
})
export class AlarmasPageComponent implements OnInit{
  seccion:number=0;
  datosUsuario!: usuario | any;
  configuracion!: AlertaConfiguracion;

  constructor(
    private api:ApiService
  ){

  }
  
  ngOnInit(): void {
    this.datosUsuario= this.api.obtenerUsuario('usuario1@gmail.com',"contraseña1");
    this.configuracion = this.datosUsuario.alertas[this.seccion].configuracion;
    this.datosUsuario = this.datosUsuario.alertas[this.seccion].alertasRegistradas;
    
  }
}
