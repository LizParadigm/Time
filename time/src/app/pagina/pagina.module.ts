import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentesModule } from '../componentes/componentes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { PrincipalComponent } from './principal/principal.component';
import { AlarmasComponent } from './alarmas/alarmas.component';
import { CrearAlarmaComponent } from './alarmas/crear-alarma/crear-alarma.component';
import { ModificarAlarmaComponent } from './alarmas/modificar-alarma/modificar-alarma.component';
import { RecordatoriosComponent } from './recordatorios/recordatorios.component';
import { CrearRecordatorioComponent } from './recordatorios/crear-recordatorio/crear-recordatorio.component';
import { ModificarRecordatorioComponent } from './recordatorios/modificar-recordatorio/modificar-recordatorio.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { CrearMedicamentoComponent } from './medicamentos/crear-medicamento/crear-medicamento.component';
import { ModificarMedicamentoComponent } from './medicamentos/modificar-medicamento/modificar-medicamento.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { CrearSeccionComponent } from './crear-seccion/crear-seccion.component';
import { HttpClientModule } from '@angular/common/http';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { IngresarComponent } from './iniciar-sesion/ingresar/ingresar.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { RegistarComponent } from './registrarse/registar/registar.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    AlarmasComponent,
    CrearAlarmaComponent,
    ModificarAlarmaComponent,
    RecordatoriosComponent,
    CrearRecordatorioComponent,
    ModificarRecordatorioComponent,
    MedicamentosComponent,
    CrearMedicamentoComponent,
    ModificarMedicamentoComponent,
    AjustesComponent,
    CrearSeccionComponent,
    IniciarSesionComponent,
    IngresarComponent,
    RegistrarseComponent,
    RegistarComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    PrincipalComponent,
    AlarmasComponent,
    CrearAlarmaComponent,
    ModificarAlarmaComponent,
    RecordatoriosComponent,
    CrearRecordatorioComponent,
    ModificarRecordatorioComponent,
    MedicamentosComponent,
    CrearMedicamentoComponent,
    ModificarMedicamentoComponent,
    AjustesComponent,
    CrearSeccionComponent,
    IniciarSesionComponent,
    IngresarComponent
  ]
})
export class PaginaModule { }
