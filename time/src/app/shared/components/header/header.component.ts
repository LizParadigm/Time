import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CrearAlertaComponent } from '@modules/seccion/components/crear-alerta/crear-alerta.component';
import { RutService } from '@shared/services/rutas/rut.service';

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

  //constructor//
  constructor(
    private _dialog: Dialog,
    private router: Router,
    private dialog: Dialog,
    private rut: RutService
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

  }

  cargarBotones() {
    if (this.router.url === '/home') {
      this.izquierda = false;
      this.derecha = true;
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

}