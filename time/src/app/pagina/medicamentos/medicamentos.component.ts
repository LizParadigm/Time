import { Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { CuadroConfirmarDeleteComponent } from '../../componentes/cuadro-confirmar-delete/cuadro-confirmar-delete.component';
import { ModificarMedicamentoComponent } from './modificar-medicamento/modificar-medicamento.component';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrl: './medicamentos.component.css'
})

export class MedicamentosComponent {
  seccionName: string = 'Medicamentos';
  
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
    this._dialog.open(ModificarMedicamentoComponent, {
      width: "700px",
      height: "800px"
    })
    console.log(' :) ')
  }
}
