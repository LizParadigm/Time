import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormgroupsService } from '@modules/seccion/services/control/formgroups.service';
import { MensajeErrorService } from '@shared/services/mensajeError/mensaje-error.service';
import { ApiService } from '@shared/services/simulacion/api.service';
import { TransportarService } from '@shared/services/transportador/transportar.service';
import { AlertaConfiguracion } from 'src/app/core/models/alertaConfiguracion.model';
import { AlertaRegistrada } from 'src/app/core/models/alertaRegistrada.model';

@Component({
  selector: 'app-modificar-alerta',
  templateUrl: './modificar-alerta.component.html',
  styleUrl: './modificar-alerta.component.css'
})
export class ModificarAlertaComponent implements OnInit {
  data!: AlertaRegistrada | any;
  configuracion!: AlertaConfiguracion | any;
  reloj: string = 'assets/media/relog-vacio.png';
  icono: string = 'assets/media/icono-cena.png';
  imagen: string = 'assets/media/icono-medicamento.png';
  errorImagen: string = '';
  deshabilitarRepetirCada: boolean = true;
  deshabilitarNotificar: boolean = true;
  deshabilitarDias: boolean = true;
  errorTitulo: string = '';
  errorFecha: string = '';
  errorCantidad: string = '';
  errorDuracion: string = '';
  errorInicia: string = '';
  errorTermina: string = '';
  errorRepetirCada: string = '';
  errorNotificar: string = '';
  errorTono: string = '';
  errorDescripcion: string = '';
  datosCrear!: FormGroup;

  //constructor//
  constructor(
    private dialog: DialogRef,
    public dialogRef: DialogRef,
    private fb: FormBuilder,
    private api: ApiService,
    private mensajeerror: MensajeErrorService,
    private controlFormgoup: FormgroupsService,
    private recibir: TransportarService
  ) { }

  ngOnInit(): void {
    this.recibir.dataAlerta$.subscribe(datos => {
      [this.data, this.configuracion] = datos;
    });
    console.log(this.configuracion);

    this.datosCrear = this.fb.group({
      reloj: [''],
      icono: [''],
      imagen: [''],
      titulo: [''],
      cantidad: [''],
      duracion1: [''],
      duracion2: [''],
      fecha: [''],
      inicia: [''],
      termina: [''],
      repetirHoras: [''],
      repetirMinutos: [''],
      deshabilitarRepetirCada: [false],
      notificarAntesMinutos: [''],
      notificarAntesHoras: [''],
      deshabilitarNotificar: [false],
      tono: [''],
      lunes: [false],
      martes: [false],
      miercoles: [false],
      jueves: [false],
      viernes: [false],
      sabado: [false],
      domingo: [false],
      deshabilitarDias: [false],
      descripcion: ['']
    });

    this.datosCrear = this.controlFormgoup.configurar(this.configuracion, this.datosCrear);
    
    if (this.configuracion.inicia) {
      this.datosCrear.get('inicia')?.valueChanges.subscribe((hora) => {
        this.reloj = this.api.obtenerReloj(hora);
      });
    }

    if (this.configuracion.repetirHoras) {
      this.datosCrear.get('deshabilitarRepetirCada')?.valueChanges.subscribe(value => {
        if (value) {
          this.deshabilitarRepetirCada = false;
          this.datosCrear.patchValue({
            repetirHoras: null
          });
          this.datosCrear.get('repetirHoras')?.setValidators([Validators.required, Validators.pattern('^(1?[0-9]|2[0-3])$')])
          this.datosCrear.get('repetirHoras')?.updateValueAndValidity();
        }
        else {
          this.deshabilitarRepetirCada = true;
          this.datosCrear.get('repetirHoras')?.clearValidators();
          this.datosCrear.get('repetirHoras')?.updateValueAndValidity();
          this.datosCrear.patchValue({
            repetirHoras: 0
          });
        }
      });
    }
    
    if (this.configuracion.repetirMinutos) {
      this.datosCrear.get('deshabilitarRepetirCada')?.valueChanges.subscribe(value => {
        if (value) {
          this.deshabilitarRepetirCada = false;
          this.datosCrear.patchValue({
            repetirMinutos: null
          });
          this.datosCrear.get('repetirMinutos')?.setValidators([Validators.required, Validators.pattern('^(1?[0-9]|2[0-3])$')])
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
      this.datosCrear = this.controlFormgoup.prepararCampos(this.configuracion, this.data, this.datosCrear)
    }

    if (this.configuracion.notificarAntesMinutos) {
      this.datosCrear.get('deshabilitarNotificar')?.valueChanges.subscribe(value => {
        if (value) {
          this.deshabilitarNotificar = false;
          this.datosCrear.patchValue({
            notificar: null
          });
          this.datosCrear.get('notificar')?.setValidators(Validators.required);
          this.datosCrear.get('notificar')?.setValidators(Validators.pattern('^(?:[0-5]?[0-9]|60)$'));
          this.datosCrear.get('notificar')?.updateValueAndValidity();
        }
        else {
          this.deshabilitarNotificar = true;
          this.datosCrear.get('notificar')?.clearValidators();
          this.datosCrear.get('notificar')?.updateValueAndValidity();
          this.datosCrear.patchValue({
            notificar: 61
          });
        }
      });
    }

    if (this.configuracion.dias) {
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
    };
  };

  //botones//
  public modificar() {

    if (this.configuracion.reloj) {
      this.datosCrear.get('reloj')?.setValue(this.reloj);
    }
    else if (this.configuracion.icono) {
      this.datosCrear.get('icono')?.setValue(this.icono);
    }
    else if (this.configuracion.imagen) {
      this.datosCrear.get('imagen')?.setValue(this.imagen);
    }

    if (this.configuracion.duracion) {
      if (this.datosCrear.get('duracion1')?.hasError('required') && this.datosCrear.get('duracion2')?.hasError('required')) {
        this.datosCrear.get('duracion')?.setValue(this.datosCrear.get('duracion1')?.value + ' ' + this.datosCrear.get('duracion2')?.value)
      }
    }

    this.mensajesError();

    if (this.datosCrear.valid &&
      this.controlFormgoup.validarFecha(this.configuracion.fecha, this.datosCrear) &&
      !this.controlFormgoup.validarDescripcion(this.configuracion.descripcion, this.datosCrear)) {
      if( this.api.modificarAlerta(sessionStorage.getItem('correo') ?? '', sessionStorage.getItem('contraseña') ?? '', parseInt(sessionStorage.getItem('seccion') ?? ''), this.data.id_alertaRegistrada, this.configuracion, this.datosCrear)){
        console.log('modificacion exitosa!')
        this.dialog.close();
      }
      else{
        console.log('ha ocurrido un error en la modificacion');
      }
      /*continuar cuando se cree el back y la base de datos/api */
    }
  }

  public cancelar(): void { this.dialog.close(); }

  public cargarImagen(): void {
    //investigar una forma de reconocer que la imagen ingresada no se rompe y es utilizable.
    //si no hay problemas, se carga a direccion a imagen.
    //si hay problemas entonces se envia el mensaje
    console.log(this.imagen)
    this.imagen = this.datosCrear.get('imgSubida')?.value.toString();
    console.log(this.imagen)
  }

  //metodos
  /*mensajes de error*/
  private mensajesError() {
    this.errorTitulo = this.mensajeerror.crearTitulo(this.datosCrear.get('titulo')?.hasError('required') ?? false);

    this.errorFecha = this.mensajeerror.crearFecha(this.datosCrear.get('fecha')?.hasError('required') ?? false, this.controlFormgoup.validarFecha(this.configuracion.fecha, this.datosCrear));

    this.errorCantidad = this.mensajeerror.crearCantidad(this.datosCrear.get('cantidad')?.hasError('required') ?? false);

    this.errorDuracion = this.mensajeerror.crearDuracion(this.datosCrear.get('duracion1')?.hasError('required') ?? false, this.datosCrear.get('duracion2')?.hasError('required') ?? false)

    this.errorInicia = this.mensajeerror.crearInicia(this.datosCrear.get('inicia')?.hasError('required') ?? false);

    this.errorTermina = this.mensajeerror.crearTermina(this.datosCrear.get('termina')?.hasError('required') ?? false);
    /*else if (this.validarCongruenciaDeLasHoras()===false){this.errorTermina='No se puede terminar antes de empezar.'}*/

    if (this.configuracion.repetirMinutos) {
      this.errorRepetirCada = this.mensajeerror.crearRepetirMinutos(this.datosCrear.get('repetirMinutos')?.value, this.datosCrear.get('repetirMinutos')?.hasError('required') ?? false, this.datosCrear.get('repetirMinutos')?.hasError('pattern') ?? false);
    }

    console.log('configuracion.repetirHoras:', this.configuracion.repetirHoras)
    if (this.configuracion.repetirHoras) {
      this.errorRepetirCada = this.mensajeerror.crearRepetirHoras(this.datosCrear.get('repetirHoras')?.value, this.datosCrear.get('repetirHoras')?.hasError('required') ?? false, this.datosCrear.get('repetirHoras')?.hasError('pattern') ?? false);
    }

    this.errorNotificar = this.mensajeerror.crearNotificar(this.datosCrear.get('notificar')?.value ?? '', this.datosCrear.get('notificar')?.hasError('required') ?? false)

    this.errorTono = this.mensajeerror.crearTono(this.datosCrear.get('tono')?.hasError('required') ?? false);

    this.errorDescripcion = this.mensajeerror.crearDescripcion(this.datosCrear.get('descripcion')?.hasError('required') ?? false, this.controlFormgoup.validarDescripcion(this.configuracion.descripcion, this.datosCrear));
  }
}