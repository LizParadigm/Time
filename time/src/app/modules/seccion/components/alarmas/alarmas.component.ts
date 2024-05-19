import { Dialog } from '@angular/cdk/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { AlertaConfiguracion } from 'src/app/core/models/alertaConfiguracion.model';
import { AlertaRegistrada } from 'src/app/core/models/alertaRegistrada.model';

@Component({
  selector: 'app-alarmas',
  templateUrl: './alarmas.component.html',
  styleUrl: './alarmas.component.css'
})
export class AlarmasComponent implements OnInit{
  @Input() alerta!: AlertaRegistrada;
  @Input() configuracion!: AlertaConfiguracion;

  constructor(private _dialog: Dialog) {}

  ngOnInit(): void {
    console.log(this.alerta)
    console.log(this.configuracion)
    console.log(this.configuracion.termina)
  }

  public delete(): void{
    // this._dialog.open(CuadroConfirmarDeleteComponent, {
    //   width: "700px",
    //   height: "800px"
    // })
    console.log(' :3 ')
  }

  public modificar(): void{
    // this._dialog.open(ModificarAlarmaComponent, {
    //   width: "700px",
    //   height: "800px"
    // })
    console.log(' :) ')
  }
}
