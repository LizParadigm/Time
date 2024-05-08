import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cuadro-confirmar-delete',
  templateUrl: './cuadro-confirmar-delete.component.html',
  styleUrl: './cuadro-confirmar-delete.component.css'
})
export class CuadroConfirmarDeleteComponent {
  seccionName: string = 'Alarmas';

  //constructor//
  constructor(
    private dialog:DialogRef,
  ){
  }
  //botones//
  public borrar(): void{
    console.log('el conjunto de informacion a sido eliminado : ) ')
    this.dialog.close();
  }
  public cancelar(): void{
    console.log('se a cancelado el proceso, saliendo : ) ')
    this.dialog.close();
  }
}
