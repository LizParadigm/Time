import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajeErrorService {

  constructor() { }

  registrarNombre(required: boolean, pattern1: boolean, minlength: boolean) {
    if (required) {
      return 'Campo necesario.';
    }
    else if (pattern1) {
      return 'solo se permiten letras.';
    }
    else if (minlength) {
      return 'Debe tener mas de 3 letras.'
    }
    else {
      return '';
    }
  }

  registrarApellido(required: boolean, pattern1: boolean): string {
    if (required) {
      return 'Campo necesario.';
    }
    else if (pattern1) {
      return 'solo se permiten letras.';
    }
    else {
      return '';
    }
  }

  registrarCorreo(required: boolean, email: boolean, /*existe: boolean*/) {
    if (required) {
      return 'Campo necesario.';
    }
    else if (email) {
      return 'Correo invalido.'
    }
    else {
      return '';
    }
  }

  registrarNickname(required: boolean, minlength: boolean) {
    if (required) {
      return 'Campo necesario.';
    }
    else if (minlength) {
      return 'Debe tener mas de 3 letras.'
    }
    else {
      return '';
    }
  }

  registrarContrasena(required: boolean, minlength: boolean) {
    if (required) {
      return 'Campo necesario.';
    }
    else if (minlength) {
      return 'Debe tener mas de 8 caracteres';
    }
    else {
      return '';
    }
  }

  registrarConfirmarContrasena(required: boolean, parentesco: boolean) {
    if (required) {
      return 'Campo necesario.';
    }
    else if (parentesco == false) {
      return 'Las contraseñas deben coincidir.';
    }
    else {
      return '';
    }
  }

  ingresarCorreo(required: boolean, email: boolean) {
    if (required) {
      return 'Campo necesario.';
    }
    else if (email) {
      return 'Correo invalido.';
    }

    else {
      return '';
    }
  }

  ingresarNickname(required: boolean) {
    if (required) {
      return 'Campo necesario.';
    }
    else {
      return '';
    }
  }

  ingresarContrasena(required: boolean) {
    if (required) {
      return 'Campo necesario.';
    }
    else {
      return '';
    }
  }

  ingresarNumerosDeTarjeta(required: boolean, numeros: boolean, minlength: boolean): string {
    if (required) {
      return 'Campo requerido.';
    }
    else if (numeros) {
      return 'Ingrese los numeros de su tarjeta.';
    }
    else if (minlength) {
      return 'Deben ser los 16 digitos de su tarjeta';
    }
    else {
      return '';
    }
  }

  ingresarFechaExpiraTarjeta(required: boolean, minlength: boolean): string {
    if (required) {
      return 'Campo requerido.';
    }
    else if (minlength) {
      return 'Ingrese la fecha que expira ejemplo: 06/24 .';
    }
    else {
      return '';
    }
  }

  ingresarCvv(required: boolean, numeros: boolean, minlength: boolean): string {
    if (required) {
      return 'Campo requerido.';
    }
    else if (numeros) {
      return 'Ingrese los numeros correspondientes a su cvv.';
    }
    else if (minlength) {
      return 'Deben ser los 4 numeros de su cvv';
    }
    else {
      return '';
    }
  }

  ingresarTitular(required: boolean, pattern1: boolean): string {
    if (required) {
      return 'Campo necesario';
    }
    else if (pattern1) {
      return 'Solo letras'
    }
    else {
      return '';
    }
  }

  crearTitulo(required: boolean): string {
    if (required) {
      return 'Campo necesario.';
    }
    else {
      return '';
    }
  }

  crearFecha(required: boolean, futuro: boolean): string {
    if (required) {
      return 'Campo necesario.';
    }
    else if (futuro === false) {
      return 'Debe ser una fecha futura.';
    }
    else {
      return '';
    }
  }

  crearCantidad(required: boolean): string {
    if (required) {
      return 'Campo necesario.';
    }
    else {
      return '';
    }
  }

  crearDuracion(required1: boolean, required2: boolean) {
    if (required1 || required2) {
      return 'Campo necesario';
    }
    else {
      return '';
    }
  }

  crearInicia(required: boolean): string {
    if (required) {
      return 'Campo necesario.';
    }
    else {
      return '';
    }
  }

  crearTermina(required: boolean): string {
    if (required) {
      return 'Campo necesario.';
    }
    else {
      return '';
    }
  }

  crearRepetirMinutos(valor: number, required: boolean, pattern1: boolean): string {
     if (required || valor === null) {
      return 'Campo necesario.';
    }
    else if (pattern1) {
      return 'Seleccione un numero dentro del rango permitido (1-60).';
    }
    else {
      return '';
    }
  }
  crearRepetirHoras(valor: number, required: boolean, pattern1: boolean): string {
    if
      (required || valor === null) {
      return 'Campo necesario.';
    }
    else if (pattern1) {
      return 'Seleccione un numero dentro del rango permitido (1-60).';
    }
    else {
      return '';
    }
  }

  crearNotificar(valor: any, required: boolean): string {
    if (valor === null) {
      return '';
    }
    else if (required) {
      return 'Campo necesario.';
    }
    else {
      return '';
    }
  }

  crearTono(required: boolean): string {
    if (required) {
      return 'Campo necesario.';
    }
    else {
      return '';
    }
  }

  crearDescripcion(required: boolean, vacio: boolean): string {
    if (required || !vacio) {
      return 'Campo necesario.';
    }
    else {
      return '';
    }
  }

  ingresarCodigoRecuperacion(required: boolean, minlength: boolean, correcto: boolean): string {
    if (required) {
      return 'Campo necesario.';
    }
    else if (minlength) {
      return 'Ingrese los 7 digitos.';
    }
    else if (correcto) {
      return 'Codigo incorrecto.';
    }
    else {
      return '';
    }
  }
}
