import { Component  } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { ModificarAlarmaComponent } from './modificar-alarma/modificar-alarma.component';
import { CuadroConfirmarDeleteComponent } from '../../componentes/cuadro-confirmar-delete/cuadro-confirmar-delete.component';

@Component({
  selector: 'app-alarmas',
  templateUrl: './alarmas.component.html',
  styleUrl: './alarmas.component.css'
})
export class AlarmasComponent {
  seccionName: string = 'alarma';
  /*constructores*/
  constructor(private _dialog: Dialog) {}

  /*botones*/
  public deleteAlarma(): void{
    this._dialog.open(CuadroConfirmarDeleteComponent, {
      width: "700px",
      height: "800px"
    })
    console.log(' :3 ')
  }

  public modificarAlarma(): void{
    this._dialog.open(ModificarAlarmaComponent, {
      width: "700px",
      height: "800px"
    })
    console.log(' :) ')
  }
}
