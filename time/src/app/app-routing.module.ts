import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmasComponent } from './pagina/alarmas/alarmas.component';
import { RecordatoriosComponent } from './pagina/recordatorios/recordatorios.component';
import { MedicamentosComponent } from './pagina/medicamentos/medicamentos.component';
import { PrincipalComponent } from './pagina/principal/principal.component';
import { AjustesComponent } from './pagina/ajustes/ajustes.component';
import { CrearSeccionComponent } from './pagina/crear-seccion/crear-seccion.component';
import { IniciarSesionComponent } from './pagina/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './pagina/registrarse/registrarse.component';

const routes: Routes = [
  /*inicio*/
  {path: '', redirectTo: '/iniciarsesion', pathMatch: 'full'},
  /*paginas*/
  {path:'inicio', component:PrincipalComponent, data: {seccionName:'bienvenido'}},
  {path:'alarma', component:AlarmasComponent, data: {seccionName:'alarmas'}},
  {path:'recordatorio', component:RecordatoriosComponent, data: {seccionName:'recordatorios'}},
  {path:'medicamento', component:MedicamentosComponent, data: {seccionName:'medicamentos'}},
  {path:'ajustes', component:AjustesComponent, data: {seccionName:'ajustes'}},
  {path:'crearSeccion', component:CrearSeccionComponent, data: {seccionName:'crear seccion'}},
  {path:'iniciarsesion', component:IniciarSesionComponent, data: {seccionName:'quitar'}},
  {path:'registrarse', component:RegistrarseComponent, data: {seccionName:'quitar'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
