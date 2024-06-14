import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@shared/services/simulacion/api.service';
import { Alerta } from 'src/app/core/models/alerta.model';
import { AlertaConfiguracion } from 'src/app/core/models/alertaConfiguracion.model';
import { AlertaRegistrada } from 'src/app/core/models/alertaRegistrada.model';
import { seccionConfiguracion } from 'src/app/core/models/seccionConfiguracion.model';

@Injectable({
  providedIn: 'root'
})
export class FormgroupsService {

  constructor(
    private api: ApiService
  ) { }

  prepararCampos(configuracion: AlertaConfiguracion, datos: AlertaRegistrada, datosFormGroup: FormGroup): FormGroup {
    if (configuracion.icono) {
      datosFormGroup.get('icono')?.setValue(datos.icono);
    }

    if (configuracion.imagen) {
      datosFormGroup.get('imagen')?.setValue(datos.imagen);
    }
    if (configuracion.titulo) {
      datosFormGroup.get('titulo')?.setValue(datos.titulo);
    }
    if (configuracion.cantidad) {
      datosFormGroup.get('cantidad')?.setValue(datos.cantidad);
    }
    if (configuracion.duracion) {
      datosFormGroup.get('duracion1')?.setValue(datos.duracion?.duracion1);

      datosFormGroup.get('duracion2')?.setValue(datos.duracion?.duracion2);
    }
    if (configuracion.fecha) {
      datosFormGroup.get('fecha')?.setValue(datos.fecha);
    }
    if (configuracion.inicia) {
      datosFormGroup.get('inicia')?.setValue(datos.inicia);
    }
    if (configuracion.termina) {
      datosFormGroup.get('termina')?.setValue(datos.termina);
    }
    if (configuracion.repetirHoras) {//investigar como cambiar el valor de deshabilitarRepetirCada y sus relacionados boolean

      if (datosFormGroup.get('repetirHoras')?.value === null) {
        datosFormGroup.get('deshabilitarRepetirCada')?.setValue(true)
      }
      datosFormGroup.get('repetirHoras')?.setValue(datos.repetirHoras);
    }
    if (configuracion.repetirMinutos) {
      if (datosFormGroup.get('repetirMinutos')?.value === null) {
        datosFormGroup.get('deshabilitarRepetirCada')?.setValue(true)
      }
      datosFormGroup.get('repetirMinutos')?.setValue(datos.repetirMinutos);
    }
    if (configuracion.notificarAntesMinutos) {
      datosFormGroup.get('notificarAntesMinutos')?.setValue(datos.notificarAntesMinutos);
    }
    if (configuracion.notificarAntesHoras) {
      datosFormGroup.get('notificarAntesHoras')?.setValue(datos.notificarAntesHoras);
    }
    if (configuracion.tono) {
      datosFormGroup.get('tono')?.setValue(datos.tono);
    }
    if (configuracion.descripcion) {
      datosFormGroup.get('descripcion')?.setValue(datos.descripcion);
    }
    if (configuracion.dias) {
      datosFormGroup.get('lunes')?.setValue(datos.dias?.lunes);
      datosFormGroup.get('martes')?.setValue(datos.dias?.martes);
      datosFormGroup.get('miercoles')?.setValue(datos.dias?.miercoles);
      datosFormGroup.get('jueves')?.setValue(datos.dias?.jueves);
      datosFormGroup.get('viernes')?.setValue(datos.dias?.viernes);
      datosFormGroup.get('sabado')?.setValue(datos.dias?.sabado);
      datosFormGroup.get('domingo')?.setValue(datos.dias?.domingo);
    }
    return datosFormGroup;
  }

  // esta funcion toma la configuracion que le manden y un formulario que manden
  // dependiendo la configuracion, prepara los elementos del form agregando valores por default y validators
  // para devolver el nuevo formulario con validaciones
  configurar(configuracion: seccionConfiguracion, datosCrear: FormGroup): any {
    let fechaActual = new Date();
    if (configuracion.reloj) {
      datosCrear.get('reloj')?.setValidators(Validators.required);
      datosCrear.get('reloj')?.updateValueAndValidity();
    }
    if (configuracion.icono) {
      datosCrear.get('icono')?.setValidators(Validators.required);
      datosCrear.get('icono')?.updateValueAndValidity();
    }
    if (configuracion.imagen) {
      datosCrear.get('imagen')?.setValidators(Validators.required);
      datosCrear.get('imagen')?.updateValueAndValidity();
    }
    if (configuracion.titulo) {
      datosCrear.get('titulo')?.setValidators(Validators.required);
      datosCrear.get('titulo')?.updateValueAndValidity();
    }
    if (configuracion.cantidad) {
      datosCrear.get('cantidad')?.setValidators(Validators.required);
      datosCrear.get('cantidad')?.updateValueAndValidity();
    }
    if (configuracion.duracion) {
      datosCrear.get('duracion1')?.setValidators(Validators.required);
      datosCrear.get('duracion1')?.updateValueAndValidity();
      datosCrear.get('duracion1')?.setValue(0)
      datosCrear.get('duracion2')?.setValidators(Validators.required);
      datosCrear.get('duracion2')?.updateValueAndValidity();
      datosCrear.get('duracion2')?.setValue("dias")
    }
    let fecha;
    if (configuracion.fecha) {
      datosCrear.get('fecha')?.setValidators(Validators.required);
      datosCrear.get('fecha')?.updateValueAndValidity();
      fecha = `${fechaActual.getFullYear()}-${(fechaActual.getMonth() + 1).toString().padStart(2, '0')}-${fechaActual.getDate().toString().padStart(2, '0')}`;
    }
    let inicia;
    if (configuracion.inicia) {
      datosCrear.get('inicia')?.setValidators(Validators.required);
      datosCrear.get('inicia')?.updateValueAndValidity();
      inicia = `${fechaActual.getHours().toString().padStart(2, '0')}:${fechaActual.getMinutes().toString().padStart(2, '0')}`;
    }

    let termina;
    if (configuracion.termina) {
      datosCrear.get('termina')?.setValidators(Validators.required);
      datosCrear.get('termina')?.updateValueAndValidity();
      termina = `${fechaActual.getHours().toString().padStart(2, '0')}:${(fechaActual.getMinutes() + 5).toString().padStart(2, '0')}`;
    }

    let repetirHoras;
    if (configuracion.repetirHoras) {
      datosCrear.get('repetirHoras')?.setValidators([Validators.required, Validators.pattern('^(1?[0-9]|2[0-3])$')]);
      datosCrear.get('repetirHoras')?.updateValueAndValidity();
      repetirHoras = 0;
      datosCrear.get('deshabilitarRepetirCada')?.setValue(false);
    }
    let repetirMinutos;
    if (configuracion.repetirMinutos) {
      datosCrear.get('repetirMinutos')?.setValidators([Validators.required, Validators.pattern('^(1?[0-9]|2[0-3])$')]);
      datosCrear.get('repetirMinutos')?.updateValueAndValidity();
      repetirMinutos = 0;
      datosCrear.get('deshabilitarRepetirCada')?.setValue(false);
    }
    let notificarAntesMinutos
    if (configuracion.notificarAntesMinutos) {
      datosCrear.get('notificarAntesMinutos')?.setValidators([Validators.required, Validators.pattern('^(?:[0-5]?[0-9]|60)$')]);
      datosCrear.get('notificarAntesMinutos')?.updateValueAndValidity();
      notificarAntesMinutos = 0;
      datosCrear.get('deshabilitarNotificar')?.setValue(false);
    }
    let notificarAntesHoras
    if (configuracion.notificarAntesHoras) {
      datosCrear.get('notificarAntesHoras')?.setValidators(Validators.required);
      datosCrear.get('notificarAntesHoras')?.updateValueAndValidity();
      notificarAntesHoras = 0;
      datosCrear.get('deshabilitarNotificar')?.setValue(false);
    }
    if (configuracion.tono) {
      datosCrear.get('tono')?.setValidators(Validators.required);
      datosCrear.get('tono')?.updateValueAndValidity();
      datosCrear.get('tono')?.setValue('predeterminado')
    }
    if (configuracion.descripcion) {
      datosCrear.get('descripcion')?.setValidators(Validators.required);
      datosCrear.get('descripcion')?.updateValueAndValidity();
    }
    if (configuracion.dias) {
      datosCrear.patchValue({
        lunes: false,
        martes: false,
        miercoles: false,
        jueves: false,
        viernes: false,
        sabado: false,
        domingo: false,
      });
    }
    return [datosCrear, [fecha, inicia, termina, repetirHoras, repetirMinutos, notificarAntesMinutos, notificarAntesHoras]];
  };

  validarFecha(fecha: boolean, datos: FormGroup): boolean {
    if (fecha) {
      return datos.get('fecha')?.value >= new Date().toISOString().split('T')[0];
    }
    else {
      return true
    }
  };

  validarDescripcion(descripcion: boolean, datos: FormGroup): boolean {
    if (descripcion) {
      return !(datos.get('descripcion')?.value === '');
    }
    else {
      return true;
    };
  };

  // validarCongruenciaDeLasHoras(): boolean{
  //   let inicioHora: number = parseInt(this.datosCrear.get('inicia')?.value.split(':')[0]);
  //   let inicioMinuto: number = parseInt(this.datosCrear.get('inicia')?.value.split(':')[1]);
  //   let terminaHora: number = parseInt(this.datosCrear.get('termina')?.value.split(':')[0]);
  //   let terminaMinuto: number = parseInt(this.datosCrear.get('termina')?.value.split(':')[1]);
  //   return  terminaHora > inicioHora ||
  //           terminaHora === inicioHora && terminaMinuto > inicioMinuto;
  // }

  nuevaAlerta(configuracion: seccionConfiguracion, datosCrear: FormGroup) {
    let alerta: Alerta = {
      seccionId: parseInt(sessionStorage.getItem('idSeccion') ?? '')
    };

    if (configuracion.reloj && datosCrear.get('reloj')?.value) {
      alerta.reloj = datosCrear.get('reloj')?.value;
    }
    if (configuracion.icono && datosCrear.get('icono')?.value) {
      alerta.icono = datosCrear.get('icono')?.value;
    }
    if (configuracion.imagen && datosCrear.get('imagen')?.value) {
      alerta.imagen = datosCrear.get('imagen')?.value;
    }
    if (configuracion.titulo && datosCrear.get('titulo')?.value) {
      alerta.titulo = datosCrear.get('titulo')?.value;
    }
    if (configuracion.cantidad && datosCrear.get('cantidad')?.value) {
      alerta.cantidad = datosCrear.get('cantidad')?.value;
    }
    if (configuracion.duracion) {
      alerta.duracion = {};
      if (datosCrear.get('duracion1')?.value) {
        alerta.duracion.duracion1 = parseInt(datosCrear.get('duracion1')?.value ?? '');
      }
      if (datosCrear.get('duracion2')?.value) {
        alerta.duracion.duracion2 = datosCrear.get('duracion2')?.value;
      }
    }
    if (configuracion.fecha && datosCrear.get('fecha')?.value) {
      alerta.fecha = datosCrear.get('fecha')?.value;
    }
    if (configuracion.inicia && datosCrear.get('inicia')?.value) {
      alerta.inicia = datosCrear.get('inicia')?.value;
    }
    if (configuracion.termina && datosCrear.get('termina')?.value) {
      alerta.termina = datosCrear.get('termina')?.value;
    }
    if (configuracion.repetirHoras && datosCrear.get('repetirHoras')?.value) {
      alerta.repetirHoras = datosCrear.get('repetirHoras')?.value;
    }
    if (configuracion.repetirMinutos && datosCrear.get('repetirMinutos')?.value) {
      alerta.repetirMinutos = datosCrear.get('repetirMinutos')?.value;
    }
    if (configuracion.notificarAntesMinutos && datosCrear.get('notificarAntesMinutos')?.value) {
      alerta.notificarAntesMinutos = datosCrear.get('notificarAntesMinutos')?.value;
    }
    if (configuracion.notificarAntesHoras && datosCrear.get('notificarAntesHoras')?.value) {
      alerta.notificarAntesHoras = datosCrear.get('notificarAntesHoras')?.value;
    }
    if (configuracion.tono && datosCrear.get('tono')?.value) {
      alerta.tono = datosCrear.get('tono')?.value;
    }
    if (configuracion.descripcion && datosCrear.get('descripcion')?.value) {
      alerta.descripcion = datosCrear.get('descripcion')?.value;
    }
    if (configuracion.dias) {
      alerta.dias = {};
      if (datosCrear.get('lunes')?.value) {
        alerta.dias.lunes = datosCrear.get('lunes')?.value;
      }
      if (datosCrear.get('martes')?.value) {
        alerta.dias.martes = datosCrear.get('martes')?.value;
      }
      if (datosCrear.get('miercoles')?.value) {
        alerta.dias.miercoles = datosCrear.get('miercoles')?.value;
      }
      if (datosCrear.get('jueves')?.value) {
        alerta.dias.jueves = datosCrear.get('jueves')?.value;
      }
      if (datosCrear.get('viernes')?.value) {
        alerta.dias.viernes = datosCrear.get('viernes')?.value;
      }
      if (datosCrear.get('sabado')?.value) {
        alerta.dias.sabado = datosCrear.get('sabado')?.value;
      }
      if (datosCrear.get('domingo')?.value) {
        alerta.dias.domingo = datosCrear.get('domingo')?.value;
      }
    }
    this.api.crearAlerta(alerta);
  }
}
