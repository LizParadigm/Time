import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from '@angular/cdk/dialog';

import { AppRoutingModule } from './app-routing.module';

import { ComponentesModule } from './componentes/componentes.module';
import { PaginaModule } from './pagina/pagina.module';
import { CrearComponentService } from './services/crear-component.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentesModule,
    PaginaModule,
    DialogModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
