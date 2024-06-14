import { Component, OnInit } from '@angular/core';
import { ApiService } from '@shared/services/simulacion/api.service';
import { TransportarService } from '@shared/services/transportador/transportar.service';
import { Alerta } from 'src/app/core/models/alerta.model';
import { AlertaConfiguracion } from 'src/app/core/models/alertaConfiguracion.model';
import { AlertaRegistrada } from 'src/app/core/models/alertaRegistrada.model';
import { seccionConfiguracion } from 'src/app/core/models/seccionConfiguracion.model';
import { TipoAlerta } from 'src/app/core/models/tipoAlerta.model';
import { usuario } from 'src/app/core/models/usuario.model';

@Component({
  selector: 'app-alarmas-page',
  templateUrl: './alarmas-page.component.html',
  styleUrl: './alarmas-page.component.css'
})

export class AlarmasPageComponent implements OnInit {
  seccion: number = 0;
  dataAlerta!: TipoAlerta | null;
  configuracion!: any;
  alertas?: Alerta[];

  constructor(
    private api: ApiService,
    private obtener: TransportarService,
    private pasar: TransportarService
  ) { }

  ngOnInit(): void {
    this.obtener.seccionConfig$.subscribe(datos => {
      this.definir(datos)
    })

    if (this.configuracion === null) {
      this.api.obtenerSeccion(parseInt(sessionStorage.getItem("idSeccion") ?? '')).subscribe((response: any) => {
        this.configuracion = response.data.seccionPorId.configuration
        this.definir2(this.configuracion)
      }, (error) => {
        console.log(error)
      });
    }

    this.api.obtenerAlertas().subscribe((data) => {
      console.log('--------------------------')
      console.log(data)
      this.definir3(data);
    });
  };

  definir(seccionConfig: any) {
    this.configuracion = seccionConfig
    console.log('desde alarmas-page!');
    console.log('1. configuracion: ', this.configuracion)

  }

  definir2(seccionConfig: any) {
    this.configuracion = seccionConfig
    this.pasar.seccionConfig(seccionConfig)
    console.log('desde alarmas-page!');
    console.log('1. configuracion: ', this.configuracion)
  }

  definir3(alertas: Alerta[]) {
    console.log('desde alarmas-page  definir3!');
    console.log('1. configuracion: ', alertas)
    this.alertas=alertas
  }
}
