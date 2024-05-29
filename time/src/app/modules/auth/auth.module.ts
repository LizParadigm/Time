import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';


@NgModule({
  declarations: [
    AuthPageComponent,
    IniciarSesionComponent,
    RegistrarComponent,
    RecuperarComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class AuthModule { }
