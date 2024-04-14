import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, } from '@angular/cdk/dialog';

@Component({
  selector: 'app-crear-alarma',
  templateUrl: './crear-alarma.component.html',
  styleUrl: './crear-alarma.component.css'
})
export class CrearAlarmaComponent {
  seccionName: string='alarmas';
  /*constructor(@Inject(DIALOG_DATA) public data: DialogData) {}
*/
}
