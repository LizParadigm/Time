import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { CuadroConfirmarDeleteComponent } from './cuadro-confirmar-delete/cuadro-confirmar-delete.component';



@NgModule({
  declarations: [
    HeaderComponent,
    PruebasComponent,
    CuadroConfirmarDeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    PruebasComponent,
    CuadroConfirmarDeleteComponent
  ]
})
export class ComponentesModule { }
