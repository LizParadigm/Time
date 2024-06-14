import { Component } from '@angular/core';
import { ComunService } from '@shared/services/comun/comun.service';
import { ApiService } from '@shared/services/simulacion/api.service';
import { TransportarService } from '@shared/services/transportador/transportar.service';
import { Seccion } from 'src/app/core/models/seccion.model';
import { seccionConfiguracion } from 'src/app/core/models/seccionConfiguracion.model';

@Component({
  selector: 'app-menu-secciones',
  templateUrl: './menu-secciones.component.html',
  styleUrl: './menu-secciones.component.css'
})
export class MenuSeccionesComponent {
  secciones!:Seccion[];

  constructor(
    private api: ApiService,
    private pasar: TransportarService,
    public comun:ComunService
  ) { }

  ngOnInit(): void {
    this.api.obtenerSecciones().subscribe((response: any) => {
      this.secciones= response.data.seccionesUsuario;
    }, (error) => {
      alert(error)
    })
  }; 

  cargarSeccion(seccionId:number,seccionNombre:String, seccionConfig:seccionConfiguracion|any){
    this.comun.cargarSeccion(seccionId, seccionNombre)
    this.pasar.seccionConfig(seccionConfig);
    this.pasar.seccionNombre(seccionNombre)

  };
}
