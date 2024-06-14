import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormgroupsService } from '@modules/seccion/services/control/formgroups.service';
import { MensajeErrorService } from '@shared/services/mensajeError/mensaje-error.service';
import { ApiService } from '@shared/services/simulacion/api.service';
import { TransportarService } from '@shared/services/transportador/transportar.service';
import { Alerta } from 'src/app/core/models/alerta.model';
import { seccionConfiguracion } from 'src/app/core/models/seccionConfiguracion.model';

@Component({
  selector: 'app-crear-alerta',
  templateUrl: './crear-alerta.component.html',
  styleUrl: './crear-alerta.component.css'
})
export class CrearAlertaComponent implements OnInit {
  seccionName!: string | null;
  configuracion!: seccionConfiguracion | any;
  placeholders!:{
    fecha: any, 
    inicia: any,
    termina: any,
    repetirHorasa: any,
    repetirMinutosa: any,
    notificarAntesMinutosa: any,
    notificarAntesHorasa: any,
  };

  reloj: string = 'assets/media/relog-vacio.png'; //buscar una api de relogs
  icono: string = 'assets/media/icono-cena.png'; //buscar un buen paquete de iconos
  imagen: string = 'assets/media/icono-medicamento.png'; //buscar como cargar las fotos

  deshabilitarRepetirCada: boolean = true;
  deshabilitarNotificar: boolean = true;
  deshabilitarDias: boolean = true;

  errorImagen: string = '';
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
  alerta!: Alerta;

  constructor(
    private dialog: DialogRef,
    public dialogRef: DialogRef,
    private fb: FormBuilder,
    private api: ApiService,
    private mensajeerror: MensajeErrorService,
    private controlFormgroup: FormgroupsService,
    private obtener: TransportarService
  ) { }

  ngOnInit(): void {
    this.datosCrear = this.fb.group({
      reloj: [],
      icono: [],
      imagen: [],
      titulo: [],
      cantidad: [],
      duracion1: [],
      duracion2: [],
      fecha: [],
      inicia: [],
      termina: [],
      repetirHoras: [],
      repetirMinutos: [],
      deshabilitarRepetirCada: [],
      notificarAntesMinutos: [],
      notificarAntesHoras: [],
      deshabilitarNotificar: [],
      tono: [],
      lunes: [],
      martes: [],
      miercoles: [],
      jueves: [],
      viernes: [],
      sabado: [],
      domingo: [],
      deshabilitarDias: [],
      descripcion: []
    });

    this.obtener.seccionConfig$.subscribe(confi => {
      this.configuracion = confi
      this.obtener.seccionNombre$.subscribe(nombre => {
        this.establecer(confi,nombre)
      });

    })

    if (this.configuracion.repetirHoras) {
      this.datosCrear.get('deshabilitarRepetirCada')?.valueChanges.subscribe(value => {
        if (!value) {
          this.deshabilitarRepetirCada = true;
          this.datosCrear.patchValue({
            repetirHoras: null
          });
          this.datosCrear.get('repetirHoras')?.setValidators([Validators.required, Validators.pattern('^(1?[0-9]|2[0-3])$')])
          this.datosCrear.get('repetirHoras')?.updateValueAndValidity();
        }
        else {
          this.deshabilitarRepetirCada = false;
          this.datosCrear.get('repetirHoras')?.clearValidators();
          this.datosCrear.get('repetirHoras')?.updateValueAndValidity();
          this.datosCrear.patchValue({
            repetirHoras: null
          });
        }
      });
    }

    if (this.configuracion.repetirMinutos) {
      this.datosCrear.get('deshabilitarRepetirCada')?.valueChanges.subscribe(value => {
        if (!value) {
          this.deshabilitarRepetirCada = true;
          this.datosCrear.patchValue({
            repetirMinutos: null
          });
          this.datosCrear.get('repetirMinutos')?.setValidators([Validators.required, Validators.pattern('^(1?[0-9]|2[0-3])$')])
          this.datosCrear.get('repetirMinutos')?.updateValueAndValidity();
        }
        else {
          this.deshabilitarRepetirCada = false;
          this.datosCrear.get('repetirMinutos')?.clearValidators();
          this.datosCrear.get('repetirMinutos')?.updateValueAndValidity();
          this.datosCrear.patchValue({
            repetirMinutos: 0
          });
        }
      });
    }
    // 
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

    // dependiendo de la hora que inicia, se cambiara la imagen del relog
    if (this.configuracion.inicia) {
      this.datosCrear.get('inicia')?.valueChanges.subscribe((hora) => {
        this.reloj = this.api.obtenerReloj(hora);

        // cuando se defina el url del reloj en this.reloj, se le pasa el valor al reloj del formulario
        this.datosCrear.get('reloj')?.setValue(this.reloj);
      });
    }
    // codificar un menu de iconos y designarlos al form, a su vez cambiar el icono impreso en pantalla
    if (this.configuracion.icono) {
      this.datosCrear.get('icono')?.setValue(this.icono);
    }

    // lo mismo que con iconos pero en vez de un menu, solo sera que añadan la imagen
    if (this.configuracion.imagen) {
      this.datosCrear.get('imagen')?.setValue(this.imagen);
    }
  }

  //botones//
  public crear() {
    this.mensajesError();

    // console.log('formulario: ', this.datosCrear.valid)
    // console.log('fecha valida: ', this.controlFormgroup.validarFecha(this.configuracion.fecha, this.datosCrear))
    // console.log('descripcion valida: ', this.controlFormgroup.validarDescripcion(this.configuracion.descripcion, this.datosCrear))
    // console.log('formulario: ', this.datosCrear.value)

    if (this.datosCrear.valid &&
      this.controlFormgroup.validarFecha(this.configuracion.fecha, this.datosCrear) &&
      this.controlFormgroup.validarDescripcion(this.configuracion.descripcion, this.datosCrear)) {
      // console.log('formulario correcto!: ', this.datosCrear)
      this.controlFormgroup.nuevaAlerta(this.configuracion, this.datosCrear);
      this.dialog.close();
    }
  }

  public cancelar(): void {
    this.dialog.close();
  }

  // se cambia la imagen de imagen
  public cargarImagen(): void {
    //investigar una forma de reconocer que la imagen ingresada no se rompe y es utilizable.
    //si no hay problemas, se carga a direccion a imagen.
    //si hay problemas entonces se envia el mensaje
    this.imagen = this.datosCrear.get('imgSubida')?.value;
  }

  establecer(config: seccionConfiguracion | any, nombre: String | any) {
    this.configuracion = config;
    this.seccionName=nombre;
    [this.datosCrear,this.placeholders] = this.controlFormgroup.configurar(this.configuracion, this.datosCrear)
  }
  private mensajesError() {
    this.errorTitulo = this.mensajeerror.crearTitulo(this.datosCrear.get('titulo')?.hasError('required') ?? false);

    this.errorFecha = this.mensajeerror.crearFecha(this.datosCrear.get('fecha')?.hasError('required') ?? false, this.controlFormgroup.validarFecha(this.configuracion.fecha, this.datosCrear));

    this.errorCantidad = this.mensajeerror.crearCantidad(this.datosCrear.get('cantidad')?.hasError('required') ?? false);

    this.errorDuracion = this.mensajeerror.crearDuracion(this.datosCrear.get('duracion1')?.hasError('required') ?? false, this.datosCrear.get('duracion2')?.hasError('required') ?? false)

    this.errorInicia = this.mensajeerror.crearInicia(this.datosCrear.get('inicia')?.hasError('required') ?? false);

    this.errorTermina = this.mensajeerror.crearTermina(this.datosCrear.get('termina')?.hasError('required') ?? false);
    /*else if (this.validarCongruenciaDeLasHoras()===false){this.errorTermina='No se puede terminar antes de empezar.'}*/

    if (this.configuracion.repetirMinutos) {
      this.errorRepetirCada = this.mensajeerror.crearRepetirMinutos(this.datosCrear.get('repetirMinutos')?.value, this.datosCrear.get('repetirMinutos')?.hasError('required') ?? false, this.datosCrear.get('repetirMinutos')?.hasError('pattern') ?? false);
    }

    if (this.configuracion.repetirHoras) {
      this.errorRepetirCada = this.mensajeerror.crearRepetirHoras(this.datosCrear.get('repetirHoras')?.value, this.datosCrear.get('repetirHoras')?.hasError('required') ?? false, this.datosCrear.get('repetirHoras')?.hasError('pattern') ?? false);
    }

    this.errorNotificar = this.mensajeerror.crearNotificar(this.datosCrear.get('notificar')?.value ?? '', this.datosCrear.get('notificar')?.hasError('required') ?? false)

    this.errorTono = this.mensajeerror.crearTono(this.datosCrear.get('tono')?.hasError('required') ?? false);

    this.errorDescripcion = this.mensajeerror.crearDescripcion(this.datosCrear.get('descripcion')?.hasError('required') ?? false, this.controlFormgroup.validarDescripcion(this.configuracion.descripcion, this.datosCrear));
  }
}