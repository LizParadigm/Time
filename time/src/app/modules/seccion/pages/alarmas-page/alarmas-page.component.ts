import { Component, OnInit } from '@angular/core';
import { ApiService } from '@shared/services/simulacion/api.service';
import { TransportarService } from '@shared/services/transportador/transportar.service';
import { AlertaConfiguracion } from 'src/app/core/models/alertaConfiguracion.model';
import { AlertaRegistrada } from 'src/app/core/models/alertaRegistrada.model';
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
  alertas?: AlertaRegistrada[];
  
  constructor(
    private api: ApiService,
    private recibir: TransportarService
  ) { }

  ngOnInit(): void {
    this.recibir.seccion$.subscribe(datos => {
      this.dataAlerta = datos;
      this.configuracion = datos?.configuracion;
      this.alertas = datos?.alertasRegistradas;
      if (this.dataAlerta === null) {
        let datosUsuario: any = this.api.obtenerUsuario(sessionStorage.getItem('correo') ?? '', sessionStorage.getItem('contraseña') ?? '');
        this.dataAlerta = datosUsuario.alertas[this.seccion].alertasRegistradas;
        this.configuracion = datosUsuario.alertas[parseInt(sessionStorage.getItem('seccion') ?? '')].configuracion;
        this.alertas = datosUsuario.alertas[parseInt(sessionStorage.getItem('seccion') ?? '')].alertasRegistradas;
      };
      console.log('desde alarmas-page!');
      console.log(1, 'objeto:', this.dataAlerta);
      console.log(2, 'configuracion:', this.dataAlerta?.configuracion);
      console.log(this.configuracion)
      console.log(3, 'lista de alertas registrada', this.dataAlerta?.alertasRegistradas);
      console.log(this.alertas)
    });

  };
}
