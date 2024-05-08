import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-seccion',
  templateUrl: './crear-seccion.component.html',
  styleUrl: './crear-seccion.component.css'
})
export class CrearSeccionComponent {
  //variables
  crearImagenReloj: string = 'assets/media/relog-vacio.png';
  crearIcono: string = 'assets/media/icono-cena.png';
  imagen: string = "../../../assets/media/icono-medicamento.png";

  errorGuardar: string = '';
  errores: string = 'Ejemplo de mensaje error.'
  datosSeccion!: FormGroup;

  //constructor
  constructor(
    private fb: FormBuilder
  ){
    this.validarDatos();
  }

  //validaciones
  validarDatos() {
    this.datosSeccion = this.fb.group({
      seccionTitulo:['',[Validators.required]],
      // palabraRef:['',[Validators.required]],
      titulo:[false],
      reloj:[false],
      icono:[false],
      imagen:[false],
      inicia:[false],
      termina:[false],
      repetirCada:[false],
      tono:[false],
      dias:[false],
      fecha:[false],
      notificar:[false],
      descripcion:[false],
      duracion:[false],
      cantidad:[false]
    }),
    this.datosSeccion.get('reloj')?.valueChanges.subscribe(value => {
      if (value){
        this.datosSeccion.patchValue({
          icono:false,
          imagen:false
        });
      }
    }),
    this.datosSeccion.get('icono')?.valueChanges.subscribe(value => {
      if(value){
        this.datosSeccion.patchValue({
          reloj:false,
          imagen:false
        });
      }
    }),
    this.datosSeccion.get('imagen')?.valueChanges.subscribe(value => {
      if (value){
        this.datosSeccion.patchValue({
          reloj:false,
          icono:false
        });
      }
    });
  }

  //botones
  crearSeccion(){
    this.mensajeError();
    console.log(this.datosSeccion.value);
  }
  cancelar(): void {
    Object.keys(this.datosSeccion.controls).forEach(controlName => {
      const control = this.datosSeccion.get(controlName);
      if (control?.value === true || control?.value === false) {
        control.setValue(false);
      }
    });
    console.log(this.datosSeccion.value);

  }
  

  //metodos
  mensajeError(){
    if (this.datosSeccion.get('seccionTitulo')?.hasError('required')){
      this.errorGuardar='Porfavor proporcione un nombre a su seccion.';
    }
    else {
      this.errorGuardar='';
    }
  }
}
