import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink } from '@angular/router';
import { MenuSeccionesComponent } from './components/menu-secciones/menu-secciones.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuSeccionesComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports:[
    HeaderComponent,
    MenuSeccionesComponent
  ]
})
export class SharedModule { }

