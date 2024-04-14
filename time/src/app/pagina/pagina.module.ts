import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmasComponent } from './alarmas/alarmas.component';
import { CrearAlarmaComponent } from './alarmas/crear-alarma/crear-alarma.component';



@NgModule({
  declarations: [
    AlarmasComponent,
    CrearAlarmaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PaginaModule { }
