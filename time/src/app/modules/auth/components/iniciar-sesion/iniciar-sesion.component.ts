import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth/auth.service';
import { MensajeErrorService } from '@shared/services/mensajeError/mensaje-error.service';
import { TransportarService } from '@shared/services/transportador/transportar.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent implements OnInit {
  errorCorreoElectronico: string = '';
  errorContrasena: string = '';
  correoExiste: boolean = false;
  contrasenaCorrecta: boolean = false;
  datosIngreso!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService,
    private mensajeerror: MensajeErrorService,
  ) { }

  ngOnInit(): void {
    this.datosIngreso = this.fb.group({
      correoElectronico: ['', [
        Validators.required,
        Validators.email], [
        /*validar si el correo existe en la base de datos.*/]
      ],

      contrasena: ['', [
        Validators.required], [
        /*validar si concuerda con la contraseña de la cuenta.*/]
      ]
    })
    this.datosIngreso.get('correoElectronico')?.valueChanges.subscribe((correo) => {
      this.correoExiste = this.authservice.validarCorreoExistente(correo)
    });
    this.datosIngreso.get('contrasena')?.valueChanges.subscribe((contra) => {
      this.contrasenaCorrecta = this.authservice.validarContrasenaCorrecta(this.datosIngreso.get('correoElectronico')?.value, contra)
    });
  }


  //botones:
  ingresar() {
    this.mensajesError();

    if (this.datosIngreso.valid && this.correoExiste && this.contrasenaCorrecta) {
      console.log('fase validar terminada :3');
      console.log('redireccionando')
      sessionStorage.setItem('correo', this.datosIngreso.get('correoElectronico')?.value);
      sessionStorage.setItem('contraseña', this.datosIngreso.get('contrasena')?.value);
      sessionStorage.setItem('tema', 'oscuro');
      this.router.navigateByUrl('/home');
    }
    else {
      console.log('notificacion error')
    }
  }

  //metodos:

  //mensajes de error:
  mensajesError() {
    this.errorCorreoElectronico = this.mensajeerror.ingresarCorreo(
      (this.datosIngreso.get('correoElectronico')?.hasError('required') ?? false),
      (this.datosIngreso.get('correoElectronico')?.hasError('email') ?? false),
      (!this.correoExiste)
    )

    this.errorContrasena = this.mensajeerror.ingresarContrasena(
      (this.datosIngreso.get('contrasena')?.hasError('required') ?? false),
      (!this.contrasenaCorrecta)
    )
  }
}