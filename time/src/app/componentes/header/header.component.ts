import { Component, inject } from '@angular/core';

import { Dialog } from '@angular/cdk/dialog';
import { CrearAlarmaComponent } from '../../pagina/alarmas/crear-alarma/crear-alarma.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  seccionName: string = 'Alarmas';
  //constructor//
  constructor(private _dialog: Dialog) {}

  //botones//
  public desplegarCrear(): void{
    this._dialog.open(CrearAlarmaComponent, {
      width: "700px",
      height: "800px"
    })
    console.log(' :) ')
  }

}