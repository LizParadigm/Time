import { Component } from '@angular/core';
import { CrearAlarmaComponent } from '../../pagina/alarmas/crear-alarma/crear-alarma.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrl: './pruebas.component.css'
})
export class PruebasComponent {
  seccionName: string = 'Recordatorios';
  //constructor//

  //botones//
  public modificarRecordatorio(): void{
    console.log('el conjunto de informacion a sido eliminado : ) ')
  }
  public cancelar(): void{
    console.log('se a cancelado el proceso, saliendo : ) ')
  }
}
