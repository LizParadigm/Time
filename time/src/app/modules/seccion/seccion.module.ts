import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeccionRoutingModule } from './seccion-routing.module';
import { AlarmasComponent } from './components/alarmas/alarmas.component';
import { AlarmasPageComponent } from './pages/alarmas-page/alarmas-page.component';
import { CrearAlertaComponent } from './components/crear-alerta/crear-alerta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AlarmasComponent,
    AlarmasPageComponent,
    CrearAlertaComponent
  ],
  imports: [
    CommonModule,
    SeccionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SeccionModule { }
