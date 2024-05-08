import { Component } from '@angular/core';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrl: './ajustes.component.css'
})
export class AjustesComponent {
  tema: string = 'oscuro';
  seccionSeleccionada: string = 'default';
  mensajeError: string = '';
  //definir una variable para guardar las secciones y sus alarmas borradas.


  /*botones*/
  public borrarSeccionSeleccionada(){
    switch(this.seccionSeleccionada){
      case 'default':
        this.mensajeError = '';
        break;
      case 'alarmas':
        this.mensajeError='Esta seccion no puede ser borrada';
        break;
      case 'recordatorios':
        this.mensajeError='Esta seccion no puede ser borrada';
        break;
      case 'medicamentos':
        this.mensajeError='Esta seccion no puede ser borrada';
        break;
      default:
        this.borrando();
        break;
    }
  }

  public confirmarCambios():void {
    console.log('el respaldo se a borrado y han confirmado cambios');
  }

  public cancelar():void{
    console.log('se han reincorporado los datos del respaldo, saliendo');
  }

  borrando(): void {
    console.log('se borrara la seccion ', this.seccionSeleccionada);
  }

}
