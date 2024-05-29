import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';

const routes: Routes = [
  {
    path:'iniciar-sesion',
    component:IniciarSesionComponent
  },
  {
    path:'registrar',
    component:RegistrarComponent
  },
  {
    path:'recuperar-cuenta',
    component:RecuperarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
