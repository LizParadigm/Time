import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-recordatorio',
  templateUrl: './crear-recordatorio.component.html',
  styleUrl: './crear-recordatorio.component.css'
})
export class CrearRecordatorioComponent {
  crearIcono: string = 'assets/media/icono-cena.png';
  deshabilitarRepetirCada: boolean = true;
  errorNombre: string = '';  
  errorFecha: string = '';
  errorInicia: string = '';
  errorTermina: string = '';
  errorRepetirCada: string = '';
  errorTono: string = '';
  errorDescripcion: string = '';
  datosCrear!: FormGroup;

  //constructor//
  constructor(
    private dialog: DialogRef,
    public dialogRef: DialogRef<CrearRecordatorioComponent>,
    private fb:FormBuilder,
    private http: HttpClient,
    private router:Router
  ){
    this.validarDatosCrear();
  }

  //validadores
  validarDatosCrear(){
    this.datosCrear = this.fb.group({
      nombre:['',[
        Validators.required
      ]],
      fecha:['',[
        Validators.required
      ]],
      inicia:['',[
        Validators.required
      ]],
      termina:['',[
        Validators.required
      ]],
      repetirCada:['',[
        Validators.required,
        Validators.pattern('^(1?[0-9]|2[0-3])$')
      ]],
      deshabilitarRepetirCada:[false],
      tono:['',[
        Validators.required
      ]],
      descripcion:['',[
        Validators.required
      ]]
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
  validarFecha(): boolean {  
    return this.datosCrear.get('fecha')?.value >= new Date().toISOString().split('T')[0];
  }

  //botones//
  crear() {
    this.mensajesError();
    console.log(this.datosCrear.value);
    
    if (this.datosCrear.valid, this.validarFecha()){
      this.dialog.close();
      /*continuar cuando se cree el back y la base de datos/api */
    }
  }
  cancelar(): void {
    this.dialog.close();
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

    //fecha:
    if (this.datosCrear.get('fecha')?.hasError('required')){
      this.errorFecha='Campo necesario.';
    }
    else if(this.validarFecha()===false){
      this.errorFecha='Debe ser una fecha futura.';
    }
    else {
      this.errorFecha='';
    }

    //inicia:
    if (this.datosCrear.get('inicia')?.hasError('required')) {
      this.errorInicia='Campo necesario.';
    }
    else {
      this.errorInicia='';
    }

    ///termina:
    if (this.datosCrear.get('termina')?.hasError('required')) {
      this.errorTermina='Campo necesario.';
    }
    /*else if (this.validarCongruenciaDeLasHoras()===false){
      this.errorTermina='No se puede terminar antes de empezar.'
    }*/
    else {
      this.errorTermina='';
    }

    //repetir cada:
    if ((this.datosCrear.get('repetirCada')?.value)===null) {
      this.errorRepetirCada='';
    }
    else if (this.datosCrear.get('repetirCada')?.hasError('required') || this.datosCrear.get('repetirCada')?.value ===null || this.datosCrear.get('repetirCada')?.hasError('pattern')) {
      this.errorRepetirCada='Campo necesario.';
    }
    else {
      this.errorRepetirCada='';
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
