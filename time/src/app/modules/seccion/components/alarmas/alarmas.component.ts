import { Dialog } from '@angular/cdk/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { AlertaConfiguracion } from 'src/app/core/models/alertaConfiguracion.model';
import { AlertaRegistrada } from 'src/app/core/models/alertaRegistrada.model';
import { AlertaDeleteComponent } from '../alerta-delete/alerta-delete.component';
import { TransportarService } from '@shared/services/transportador/transportar.service';
import { ModificarAlertaComponent } from '../modificar-alerta/modificar-alerta.component';

@Component({
  selector: 'app-alarmas',
  templateUrl: './alarmas.component.html',
  styleUrl: './alarmas.component.css'
})
export class AlarmasComponent implements OnInit {
  @Input() alerta!: AlertaRegistrada;
  @Input() configuracion!: AlertaConfiguracion;

  constructor(
    private _dialog: Dialog,
    private pasar: TransportarService
  ) { };

  ngOnInit(): void {
    console.log(this.alerta)
    console.log(this.configuracion)
    console.log(this.configuracion.termina)
  };

  public delete(): void {
    this.pasar.alertaDelete(this.alerta, parseInt(sessionStorage.getItem('seccion') ?? ''));
    this._dialog.open(AlertaDeleteComponent);

    console.log(' :3 ')
  };

  public modificar(): void {
    this.pasar.dataAlerta(this.alerta, this.configuracion);
    this._dialog.open(ModificarAlertaComponent);
    console.log(' :) ')
  }

  pos(): string {
    let pos: string = '';
    return pos;
  }
}
