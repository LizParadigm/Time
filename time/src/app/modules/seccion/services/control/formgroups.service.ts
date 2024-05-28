import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { AlertaConfiguracion } from 'src/app/core/models/alertaConfiguracion.model';
import { AlertaRegistrada } from 'src/app/core/models/alertaRegistrada.model';

@Injectable({
  providedIn: 'root'
})
export class FormgroupsService {

  constructor() { }

  prepararCampos(configuracion:AlertaConfiguracion, datos:AlertaRegistrada, datosFormGroup:FormGroup): FormGroup{
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
      
      if(datosFormGroup.get('repetirHoras')?.value === null){
        datosFormGroup.get('deshabilitarRepetirCada')?.setValue(true)
      }
      datosFormGroup.get('repetirHoras')?.setValue(datos.repetirHoras);
    }
    if (configuracion.repetirMinutos) {
      if(datosFormGroup.get('repetirMinutos')?.value === null){
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
    if( configuracion.dias){
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

  configurar(configuracion:AlertaConfiguracion,datosCrear:FormGroup): FormGroup {
    console.log('holi desde metodo configurar!')
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

      datosCrear.get('duracion2')?.setValidators(Validators.required);
      datosCrear.get('duracion2')?.updateValueAndValidity();
    }
    if (configuracion.fecha) {
      datosCrear.get('fecha')?.setValidators(Validators.required);
      datosCrear.get('fecha')?.updateValueAndValidity();
    }
    if (configuracion.inicia) {
      datosCrear.get('inicia')?.setValidators(Validators.required);
      datosCrear.get('inicia')?.updateValueAndValidity();
    }
    if (configuracion.termina) {
      datosCrear.get('termina')?.setValidators(Validators.required);
      datosCrear.get('termina')?.updateValueAndValidity();
    }
    if (configuracion.repetirHoras) {
      datosCrear.get('repetirHoras')?.setValidators([Validators.required, Validators.pattern('^(1?[0-9]|2[0-3])$')]);
      datosCrear.get('repetirHoras')?.updateValueAndValidity();
    }
    if (configuracion.repetirMinutos) {
      datosCrear.get('repetirMinutos')?.setValidators([Validators.required, Validators.pattern('^(1?[0-9]|2[0-3])$')]);
      datosCrear.get('repetirMinutos')?.updateValueAndValidity();
    }
    if (configuracion.notificarAntesMinutos) {
      datosCrear.get('notificarAntesMinutos')?.setValidators([Validators.required, Validators.pattern('^(?:[0-5]?[0-9]|60)$')]);
      datosCrear.get('notificarAntesMinutos')?.updateValueAndValidity();
    }
    if (configuracion.notificarAntesHoras) {
      datosCrear.get('notificarAntesHoras')?.setValidators(Validators.required);
      datosCrear.get('notificarAntesHoras')?.updateValueAndValidity();
    }
    if (configuracion.tono) {
      datosCrear.get('tono')?.setValidators(Validators.required);
      datosCrear.get('tono')?.updateValueAndValidity();
    }
    if (configuracion.descripcion) {
      datosCrear.get('descripcion')?.setValidators(Validators.required);
      datosCrear.get('descripcion')?.updateValueAndValidity();
    }
    return datosCrear;
  };

  validarFecha(fecha:boolean, datos:FormGroup): boolean {
    if (fecha) {
      return datos.get('fecha')?.value >= new Date().toISOString().split('T')[0];
    }
    else {
      return true
    }
  };

  validarDescripcion(descripcion:boolean, datos:FormGroup): boolean {
    if (descripcion) {
      return datos.get('descripcion')?.value === '';
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
}
