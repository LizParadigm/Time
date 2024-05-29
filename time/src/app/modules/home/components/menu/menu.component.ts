import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@shared/services/simulacion/api.service';
import { TransportarService } from '@shared/services/transportador/transportar.service';
import { AlertaRegistrada } from 'src/app/core/models/alertaRegistrada.model';
import { TipoAlerta } from 'src/app/core/models/tipoAlerta.model';
import { usuario } from 'src/app/core/models/usuario.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  alertas!: TipoAlerta[];

  constructor(
    private transportar: TransportarService,
    private api: ApiService,
    private router: Router,
    private pasar: TransportarService
  ) { }

  ngOnInit(): void {
    let usuario: usuario = this.api.obtenerUsuario(sessionStorage.getItem('correo') ?? '', sessionStorage.getItem('contraseña') ?? '')
    this.alertas = usuario.alertas
  };

  seccion(alarma: TipoAlerta, i: number) {
    console.log('desde menu!', alarma)
    // this.pasar.seccion.emit( alarma );
    this.pasar.changeSeccion(alarma,i);
    this.router.navigateByUrl('/home/seccion');
  }
}
