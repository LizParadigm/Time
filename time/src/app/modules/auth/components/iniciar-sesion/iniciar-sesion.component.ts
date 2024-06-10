import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth/auth.service';
import { MensajeErrorService } from '@shared/services/mensajeError/mensaje-error.service';
import { Credential } from 'src/app/core/models/users/credencial';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent implements OnInit {
  errorNickname: String = '';
  errorContrasena: string = '';
  correoExiste: boolean = false;
  contrasenaCorrecta: boolean = false;
  datosIngreso!: FormGroup;
  username: String = "";
  password: String = "";

  constructor(
    private fb: FormBuilder,
    private mensajeerror: MensajeErrorService,
    private peticiones: AuthService,
  ) { }


  ngOnInit(): void {
    this.datosIngreso = this.fb.group({
      nickname: ['', [Validators.required]],
      contrasena: ['', [Validators.required]]
    });
  };

  ingresar() {
    this.mensajesError();
    let credencial = new Credential();
    if (this.datosIngreso.valid) {
      credencial.username = this.datosIngreso.get('nickname')?.value;
      credencial.password = this.datosIngreso.get('contrasena')?.value;
      this.peticiones.iniciarSesion(credencial, (error) => {
        this.mensajesError(error);
      });
    }
  }

  mensajesError(error?:any) {
    this.errorNickname = this.mensajeerror.ingresarNickname(
      this.datosIngreso.get('nickname')?.hasError('required') ?? false,
    )

    this.errorContrasena = this.mensajeerror.ingresarContrasena(
      (this.datosIngreso.get('contrasena')?.hasError('required') ?? false),
    )

    if(error){
      // investigar como meter validaciones en el back sin romper el codigo
      // para mensajes especifico de usuario no encontrado y contraseña incorrecta
      // switch(error.message){
      //   case'':
      //     this.errorNickname='El usuario no existe.';
      //     break;
      //   case'':
      //     this.errorContrasena='Contraseña incorrecta.';
      //     break;
      //   default:
      //     alert(error);
      //     break;
      // }
      this.errorNickname='Usuario o contraseña incorrectos.';
      this.datosIngreso.patchValue({
        nickname:'',
        contrasena:''
      })
    }
  }
}