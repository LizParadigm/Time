import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrl: './ingresar.component.css'
})
export class IngresarComponent {
//atributos:
errorCorreoElectronico: string = '';
errorContrasena: string = '';

datosIngreso!:FormGroup;

// continuar: boolean = true;
//constructor:
constructor (private fb:FormBuilder, private http: HttpClient, private router:Router){
  this.validarDatosIngreso();
}

//botones:
ingresar(){
  this.mensajesError();

  if (this.datosIngreso.valid){
    console.log('fase validar terminada :3');
    this.router.navigateByUrl('inicio');
  }

}
//metodos:
//validador:
validarDatosIngreso(){
  this.datosIngreso = this.fb.group({
    correoElectronico:['',[
      Validators.required,
      Validators.email
    ],[
      //validar si el correo existe en la base de datos.
    ]],

    contrasena:['',[
      Validators.required,
    ],[
      //validar si concuerda con la contraseña de la cuenta.
    ]]
  })
}

//mensajes de error:
mensajesError(){
  //correo electronico:
  if (this.datosIngreso.get('correoElectronico')?.hasError('required')){
    this.errorCorreoElectronico='Campo necesario.';
  }
  else if (this.datosIngreso.get('correoElectronico')?.hasError('email')){
    this.errorCorreoElectronico='Correo invalido.';
  }
  // else if(this.datosIngreso.get('correoElectronico')?.hastError(/*validar existencia en bd.*/)){
  //   this.errorCorreoElectronico='Correo no encontrado';
  // }
  else {
    this.errorCorreoElectronico='';
  }

  //contraseña:
  if (this.datosIngreso.get('contrasena')?.hasError('required')){
    this.errorContrasena='Campo necesario.';
  }
  // else if (this.datosIngreso.get('contrasena')?.hasError(/*vaidar contraseña correcta*/)){
  //   this.errorContrasena='Contraseña incorrecta.';
  // }
  else {
    this.errorContrasena='';
  }
}


}
