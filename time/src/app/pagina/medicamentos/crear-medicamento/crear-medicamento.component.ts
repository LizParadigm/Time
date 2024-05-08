import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-medicamento',
  templateUrl: './crear-medicamento.component.html',
  styleUrl: './crear-medicamento.component.css'
})
export class CrearMedicamentoComponent {
  imagen: string = "../../../assets/media/icono-medicamento.png";
  deshabilitarRepetirCada: boolean = true;
  deshabilitarNotificar: boolean = true;
  errorNombre: string = '';  
  errorCantidad: string = '';
  errorRepetirCada: string = '';
  errorDuracion: string = '';
  errorNotificar: string = '';
  errorTono: string = '';
  errorDescripcion: string = '';
  datosCrear!: FormGroup;

  //constructor//
  constructor(
    private dialog: DialogRef,
    public dialogRef: DialogRef<CrearMedicamentoComponent>,
    private fb:FormBuilder,
    private http: HttpClient,
    private router:Router
  ){
    this.validarDatosCrear();
  }

  //validadores
  validarDatosCrear(){
    this.datosCrear = this.fb.group({
      imagen:[''],
      nombre:['',[
        Validators.required
      ]],
      cantidad:['',[
        Validators.required
      ]],
      repetirCada:['',[
        Validators.required,
        Validators.pattern('^(1?[0-9]|2[0-3])$')
      ]],
      deshabilitarRepetirCada:[false],
      duracion1:['',[
        Validators.required
      ]],
      duracion2:['',[
        Validators.required
      ]],
      notificar:['',[
        Validators.required,
        Validators.pattern('^(?:[0-5]?[0-9]|60)$')
      ]],
      deshabilitarNotificar:['',[
        Validators.required
      ]],
      tono:['',[
        Validators.required
      ]],
      descripcion:['',[
        Validators.required
      ]]
    });
    this.datosCrear.get('deshabilitarNotificar')?.valueChanges.subscribe(value => {
      if(value){
        this.deshabilitarNotificar=false;
        this.datosCrear.patchValue({
          notificar:null
        });
        this.datosCrear.get('notificar')?.setValidators(Validators.required);
        this.datosCrear.get('notificar')?.setValidators(Validators.pattern('^(?:[0-5]?[0-9]|60)$'));
        this.datosCrear.get('notificar')?.updateValueAndValidity();
      }
      else {
        this.deshabilitarNotificar=true;
        this.datosCrear.get('notificar')?.clearValidators();
        this.datosCrear.get('notificar')?.updateValueAndValidity();
        this.datosCrear.patchValue({
          notificar:61
        });
      }
    });
    this.datosCrear.get('deshabilitarRepetirCada')?.valueChanges.subscribe(value => {
      if(value){
        this.deshabilitarRepetirCada=false;
        this.datosCrear.patchValue({
          repetirCada:null
        });
        this.datosCrear.get('repetirCada')?.setValidators(Validators.required);
        this.datosCrear.get('repetirCada')?.setValidators(Validators.pattern('^(1?[0-9]|2[0-3])$'))
        this.datosCrear.get('repetirCada')?.updateValueAndValidity();
      }
      else {
        this.deshabilitarRepetirCada=true;
        this.datosCrear.get('repetirCada')?.clearValidators();
        this.datosCrear.get('repetirCada')?.updateValueAndValidity();
        this.datosCrear.patchValue({
          repetirCada:0
        });
      }
    });    
  }
  

  //botones//
  crear() {
    this.mensajesError();
    console.log(this.datosCrear.value);
    
    if (this.datosCrear.valid) {
      this.dialog.close();
      /*continuar cuando se cree el back y la base de datos/api */
    }
  }
  cancelar(): void {
    this.dialog.close();
  }
  cargarImagen(){
    //logica para cambiar la imagen.
  }
  //metodos
  /*mensajes de error*/
  mensajesError(){
    //nombre:
    if (this.datosCrear.get('nombre')?.hasError('required')) {
      this.errorNombre='Campo necesario.';
    }
    else {
      this.errorNombre='';
    }

    //cantidad:
    if (this.datosCrear.get('cantidad')?.hasError('required')) {
      this.errorCantidad='Campo necesario.';
    }
    else {
      this.errorCantidad='';
    }

    //repetir cada:
    if ((this.datosCrear.get('repetirCada')?.value)===null) {
      this.errorRepetirCada='';
    }
    else if (this.datosCrear.get('repetirCada')?.hasError('required') || this.datosCrear.get('repetirCada')?.hasError('pattern')) {
      this.errorRepetirCada='Campo necesario.';
    }
    else {
      this.errorRepetirCada='';
    }

    //duracion1 y duracion2:
    if(this.datosCrear.get('duracion1')?.hasError('required') || this.datosCrear.get('duracion2')?.hasError('required')){
      this.errorDuracion='Campo necesario.';
    }
    else {
      this.errorDuracion='';
    }

    //notificar:
    if ((this.datosCrear.get('notificar')?.value)===null) {
      this.errorNotificar='';
    }
    else if(this.datosCrear.get('notificar')?.hasError('required') || this.datosCrear.get('notificar')?.hasError('pattern') || this.datosCrear.get('notificar')?.value === 61){
      this.errorNotificar='Campo necesario.';
    }
    else {
      this.errorNotificar='';
    }

    //tono:
    if(this.datosCrear.get('tono')?.hasError('required')) {
      this.errorTono='Campo necesario.';
    }
    else {
      this.errorTono='';
    }

    //descripcion:
    if(this.datosCrear.get('descripcion')?.hasError('required')){
      this.errorDescripcion='Campo necesario.';
    }
    else {
      this.errorDescripcion='';
    }
  }

}
