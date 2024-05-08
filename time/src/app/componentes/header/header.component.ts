import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';

import { CrearAlarmaComponent } from '../../pagina/alarmas/crear-alarma/crear-alarma.component';

import { CrearRecordatorioComponent } from '../../pagina/recordatorios/crear-recordatorio/crear-recordatorio.component';
import { CrearMedicamentoComponent } from '../../pagina/medicamentos/crear-medicamento/crear-medicamento.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})

export class HeaderComponent implements OnInit {
  seccionName: string = '';
  visibilidadHeader: boolean = true;
  visibilidadElementoIzquierdo: boolean =true;
  visibilidadElementoDerecho: boolean =true;
  componenteAbierto: any;
  
  //constructor//
  constructor(
    private _dialog: Dialog,
    private router: Router,
    private dialog: Dialog
  ) {}

  desplegarCrear(): void {
    switch (this.seccionName){
      case'alarmas':
        this.componenteAbierto = this._dialog.open(CrearAlarmaComponent)
        break;
      case 'recordatorios':
        this.componenteAbierto = this._dialog.open(CrearRecordatorioComponent);
        break;
      case 'medicamentos':
        this.componenteAbierto = this._dialog.open(CrearMedicamentoComponent);
        break;
    }
      console.log(' :) ')
  }
  /*cerrar crear_______component*/
  cerrarComponenteAbierto(): void {
    if (this.componenteAbierto) {
      this.componenteAbierto.close();
    }
    console.log('se llamo cerrarDialogo');
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.seccionName = this.getSeccionNameFromRoute();
      this.ocultarBotMen();
    });
  }

  ocultarBotMen(){
    switch(this.seccionName){
      case 'alarmas':
        this.visibilidadElementoIzquierdo=true;
        this.visibilidadElementoDerecho=true;
        break;
      case 'recordatorios':
        this.visibilidadElementoIzquierdo=true;
        this.visibilidadElementoDerecho=true;
        break;
      case 'medicamentos':
        this.visibilidadElementoIzquierdo=true;
        this.visibilidadElementoDerecho=true;
        break;
      case 'ajustes':
        this.visibilidadElementoIzquierdo=true;
        this.visibilidadElementoDerecho=false;
        break;
      case 'crear seccion':
        this.visibilidadElementoIzquierdo=true;
        this.visibilidadElementoDerecho=false;
        break;
      case 'quitar':
        this.visibilidadHeader=false;
        break;
      case 'registrar':
        this.visibilidadHeader=false;
        break;
      case 'bienvenido':
        this.visibilidadHeader=true;
        this.visibilidadElementoIzquierdo=false;
        this.visibilidadElementoDerecho=false;
        break;
      default:
        this.visibilidadElementoIzquierdo=false;
        this.visibilidadElementoDerecho=false;
        break;
    }
  }
  /*Con esto obtenemos la ruta de la pagina*/
  getSeccionNameFromRoute(): string {
    /*Obtener la ruta activa*/
    let ruta = this.router.routerState.snapshot.root;
    while (ruta.firstChild) {
      ruta = ruta.firstChild;
    }
    /*Extraer el nombre de la sección del data asociado con la ruta*/
    return ruta.data['seccionName'];
  }
}