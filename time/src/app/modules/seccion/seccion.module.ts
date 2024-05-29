import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeccionRoutingModule } from './seccion-routing.module';
import { AlarmasPageComponent } from './pages/alarmas-page/alarmas-page.component';
import { CrearAlertaComponent } from './components/crear-alerta/crear-alerta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertaDeleteComponent } from './components/alerta-delete/alerta-delete.component';
import { ModificarAlertaComponent } from './components/modificar-alerta/modificar-alerta.component';
import { AlertaComponent } from './components/alerta/alerta.component';


@NgModule({
  declarations: [
    AlarmasPageComponent,
    CrearAlertaComponent,
    AlertaDeleteComponent,
    ModificarAlertaComponent,
    AlertaComponent
  ],
  imports: [
    CommonModule,
    SeccionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SeccionModule { }
