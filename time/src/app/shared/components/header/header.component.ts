import { Dialog } from '@angular/cdk/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrearAlertaComponent } from '@modules/seccion/components/crear-alerta/crear-alerta.component';
import { ComunService } from '@shared/services/comun/comun.service';
import { RutService } from '@shared/services/rutas/rut.service';
import { ApiService } from '@shared/services/simulacion/api.service';
import { TransportarService } from '@shared/services/transportador/transportar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  tituloHeader!: string | any;
  izquierda!: boolean;
  derecha!: boolean;
  componenteAbierto: any;

  constructor(
    private _dialog: Dialog,
    private router: Router,
    private rut: RutService,
    private api: ApiService,
    private pasar: TransportarService,
    private pedir: TransportarService,
    public comun: ComunService
  ) {

  }

  ngOnInit(): void {
    this.pedir.seccionNombre$.subscribe(titulo => {
      this.definir(titulo);
    })
  }

  inicio() {
    this.pasar.seccionNombre('T I M E')
    this.router.navigateByUrl('/home');
  }

  desplegarCrear(): void {
    this.componenteAbierto = this._dialog.open(CrearAlertaComponent)
  }

  definir(titulo: any) {
    this.cargarBotones()
    this.tituloHeader = titulo || sessionStorage.getItem('nombreSeccion');
  }

  cargarBotones() {
    switch (this.router.url) {
      case '/home':
        this.izquierda = false;
        this.derecha = false;
        break;
      case '/home/seccion':
        this.izquierda = true;
        this.derecha = true;
        break;
      default:
        this.izquierda = true;
        this.derecha = false;
    }
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('nombreSeccion')
    this.tituloHeader = this.rut.cambiarTitulo();
  }
}