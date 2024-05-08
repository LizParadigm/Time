import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-alarma',
  templateUrl: './modificar-alarma.component.html',
  styleUrl: './modificar-alarma.component.css'
})
export class ModificarAlarmaComponent {
  crearImagenReloj: string = 'assets/media/relog-vacio.png';
  deshabilitarRepetirCada: boolean = true;
  deshabilitarDias: boolean = true;
  errorNombre: string = '';  
  errorFecha: string = '';
  errorInicia: string = '';
  errorTermina: string = '';
  errorRepetirCada: string = '';
  errorTono: string = '';
  datosCrear!: FormGroup;

  //constructor//
  constructor(
    private dialog: DialogRef,
    public dialogRef: DialogRef<ModificarAlarmaComponent>,
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
      lunes:[false],
      martes:[false],
      miercoles:[false],
      jueves:[false],
      viernes:[false],
      sabado:[false],
      domingo:[false],
      deshabilitarDias:[false]
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
    this.datosCrear.get('deshabilitarDias')?.valueChanges.subscribe(value => {
      if(value){
        this.deshabilitarDias=false;
        this.datosCrear.patchValue({
          lunes:false,
          martes: false,
          miercoles: false,
          jueves: false,
          viernes: false,
          sabado: false,
          domingo: false,
        });

      }
      else{
        this.deshabilitarDias=true;
        
      }
    });
  }
  // validarCongruenciaDeLasHoras(): boolean{
  //   let inicioHora: number = parseInt(this.datosCrear.get('inicia')?.value.split(':')[0]);
  //   let inicioMinuto: number = parseInt(this.datosCrear.get('inicia')?.value.split(':')[1]);
  //   let terminaHora: number = parseInt(this.datosCrear.get('termina')?.value.split(':')[0]);
  //   let terminaMinuto: number = parseInt(this.datosCrear.get('termina')?.value.split(':')[1]);
  //   return  terminaHora > inicioHora ||
  //           terminaHora === inicioHora && terminaMinuto > inicioMinuto;
  // }

  //botones//
  crear() {
    this.mensajesError();
    if(this.datosCrear.valid){
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
  }

}
