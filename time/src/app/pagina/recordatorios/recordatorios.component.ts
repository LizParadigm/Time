import { Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { CuadroConfirmarDeleteComponent } from '../../componentes/cuadro-confirmar-delete/cuadro-confirmar-delete.component';
import { ModificarRecordatorioComponent } from './modificar-recordatorio/modificar-recordatorio.component';

@Component({
  selector: 'app-recordatorios',
  templateUrl: './recordatorios.component.html',
  styleUrl: './recordatorios.component.css'
})
export class RecordatoriosComponent {
  seccionName: string = 'Recordatorios';
  /*constructores*/
  constructor(private _dialog: Dialog) {}

  /*botones*/
  public deleteRecordatorio(): void{
    this._dialog.open(CuadroConfirmarDeleteComponent, {
      width: "700px",
      height: "800px"
    }) 
    console.log(' :3 ')
  }

  public modificarRecordatorio(): void{
    this._dialog.open(ModificarRecordatorioComponent, {
      width: "700px",
      height: "800px"
    })
    console.log(' :) ')
  }
}
