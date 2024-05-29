import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CrearAlertaComponent } from '@modules/seccion/components/crear-alerta/crear-alerta.component';
import { RutService } from '@shared/services/rutas/rut.service';
import { ApiService } from '@shared/services/simulacion/api.service';
import { TransportarService } from '@shared/services/transportador/transportar.service';
import { TipoAlerta } from 'src/app/core/models/tipoAlerta.model';
import { usuario } from 'src/app/core/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  tituloHeader!: string;
  izquierda!: boolean;
  derecha!: boolean;
  componenteAbierto: any;
  alertas!: TipoAlerta[];

  //constructor//
  constructor(
    private _dialog: Dialog,
    private router: Router,
    private rut: RutService,
    private api: ApiService,
    private pasar: TransportarService
  ) {
    this.cargarBotones()
    this.tituloHeader = this.rut.cambiarTitulo()
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.tituloHeader = this.rut.cambiarTitulo();
        this.cargarBotones();
      }
    })
    let usuario: usuario = this.api.obtenerUsuario(sessionStorage.getItem('correo') ?? '', sessionStorage.getItem('contraseña') ?? '')
    console.log(usuario.alertas)
    this.alertas = usuario.alertas

  }

  cargarBotones() {
    if (this.router.url === '/home') {
      this.izquierda = false;
      this.derecha = false;
    }
    else {
      this.izquierda = true;
      this.derecha = true;
    }
  }

  desplegarCrear(): void {
    this.componenteAbierto = this._dialog.open(CrearAlertaComponent)
    console.log(' :) ')
  }

  seccion(alarma: TipoAlerta, i: number) {
    console.log('desde menu!', alarma)
    // this.pasar.seccion.emit( alarma );
    this.pasar.changeSeccion(alarma, i);
    this.router.navigateByUrl('/home/seccion');
  }

}