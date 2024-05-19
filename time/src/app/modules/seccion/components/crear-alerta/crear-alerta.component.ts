import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajeErrorService } from '@shared/services/mensajeError/mensaje-error.service';
import { ApiService } from '@shared/services/simulacion/api.service';
import { AlertaConfiguracion } from 'src/app/core/models/alertaConfiguracion.model';
import { usuario } from 'src/app/core/models/usuario.model';

@Component({
  selector: 'app-crear-alerta',
  templateUrl: './crear-alerta.component.html',
  styleUrl: './crear-alerta.component.css'
})
export class CrearAlertaComponent implements OnInit {
  configuracion!: AlertaConfiguracion;
  reloj: string = 'assets/media/relog-vacio.png';
  deshabilitarRepetirCada: boolean = true;
  deshabilitarDias: boolean = true;
  errorTitulo: string = '';
  errorInicia: string = '';
  errorTermina: string = '';
  errorRepetirCada: string = '';
  errorTono: string = '';
  datosCrear!: FormGroup;

  //constructor//
  constructor(
    private dialog: DialogRef,
    public dialogRef: DialogRef,
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private mensajeerror: MensajeErrorService
  ) {
  }

  ngOnInit(): void {
    let usuario: usuario | any = this.api.obtenerUsuario('usuario1@gmail.com', 'contraseña1');
    console.log(usuario)
    this.configuracion = usuario.alertas[0].configuracion;
    console.log(this.configuracion)

    this.datosCrear = this.fb.group({
      titulo: ['', [Validators.required]],
      inicia: ['', [Validators.required]],
      termina: ['', [Validators.required]],
      repetirMinutos: ['', [Validators.required, Validators.pattern('^(1?[0-9]|2[0-3])$')]],
      deshabilitarRepetirCada: [false],
      tono: ['', [Validators.required]],
      lunes: [false],
      martes: [false],
      miercoles: [false],
      jueves: [false],
      viernes: [false],
      sabado: [false],
      domingo: [false],
      deshabilitarDias: [false]
      // "reloj": true,
      // "icono": false,
      // "imagen": false,
      // "cantidad": false,
      // "duracion": false,
      // "fecha": false,
      // "repetirMinutos": true,
      // "repetirHoras": false,
      // "notificarAntesMinutos": false,
      // "notificarAntesHoras": false,
      // "descripcion": false
    });

    this.datosCrear.get('inicia')?.valueChanges.subscribe((hora) => {
      this.reloj = this.api.obtenerReloj(hora);
    });

    this.datosCrear.get('deshabilitarRepetirCada')?.valueChanges.subscribe(value => {
      if (value) {
        this.deshabilitarRepetirCada = false;
        this.datosCrear.patchValue({
          repetirMinutos: null
        });
        this.datosCrear.get('repetirMinutos')?.setValidators(Validators.required);
        this.datosCrear.get('repetirMinutos')?.setValidators(Validators.pattern('^(1?[0-9]|2[0-3])$'))
        this.datosCrear.get('repetirMinutos')?.updateValueAndValidity();
      }
      else {
        this.deshabilitarRepetirCada = true;
        this.datosCrear.get('repetirMinutos')?.clearValidators();
        this.datosCrear.get('repetirMinutos')?.updateValueAndValidity();
        this.datosCrear.patchValue({
          repetirMinutos: 0
        });
      }
    });

    this.datosCrear.get('deshabilitarDias')?.valueChanges.subscribe(value => {
      if (value) {
        this.deshabilitarDias = false;
        this.datosCrear.patchValue({
          lunes: false,
          martes: false,
          miercoles: false,
          jueves: false,
          viernes: false,
          sabado: false,
          domingo: false,
        });
      }
      else {
        this.deshabilitarDias = true;
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
    if (this.datosCrear.valid) {
      this.dialog.close();
      /*continuar cuando se cree el back y la base de datos/api */
    }
  }

  cancelar(): void { this.dialog.close(); }

  //metodos
  /*mensajes de error*/
  mensajesError() {
    this.errorTitulo = this.mensajeerror.crearTitulo(this.datosCrear.get('titulo')?.hasError('required') ?? false);

    this.errorInicia = this.mensajeerror.crearInicia(this.datosCrear.get('inicia')?.hasError('required') ?? false);

    this.errorTermina = this.mensajeerror.crearTermina(this.datosCrear.get('termina')?.hasError('required') ?? false);
    /*else if (this.validarCongruenciaDeLasHoras()===false){this.errorTermina='No se puede terminar antes de empezar.'}*/

    this.errorRepetirCada = this.mensajeerror.crearRepetirMinutos(this.datosCrear.get('repetirMinutos')?.value, this.datosCrear.get('repetirMinutos')?.hasError('required') ?? false, this.datosCrear.get('repetirMinutos')?.hasError('pattern') ?? false);

    this.errorTono = this.mensajeerror.crearTono(this.datosCrear.get('tono')?.hasError('required') ?? false);
  }

}

