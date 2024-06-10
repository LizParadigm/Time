import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth/auth.service';
import { MensajeErrorService } from '@shared/services/mensajeError/mensaje-error.service';
import { Credential } from 'src/app/core/models/users/credencial';
import { User } from 'src/app/core/models/users/user';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements OnInit {
  errorNombre: string = "";
  errorApellido: string = "";
  errorCorreoElectronico: string = "";
  errorNickname: String = "";
  errorContrasena: string = "";
  errorConfirmarContrasena: string = "";
  contraseñaConcuerda!: boolean;

  botonAccesible: boolean = true;

  forma!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mensajeError: MensajeErrorService,
    private peticiones: AuthService
  ) {
  }

  ngOnInit(): void {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      correoElectronico: ['', [Validators.required, Validators.email],],
      nickname: ['', [Validators.required, Validators.minLength(2)]],
      contrasena: ['', [Validators.required, Validators.minLength(8)],],
      confirmarContrasena: ['', [Validators.required],],
      politicasDePrivacidad: [false],
      usosYCondiciones: [false]
    });

    this.forma.get('politicasDePrivacidad')?.valueChanges.subscribe((politicas) => {
      this.botonAccesible = !(politicas && this.forma.get('usosYCondiciones')?.value);
    });

    this.forma.get('usosYCondiciones')?.valueChanges.subscribe((usos) => {
      this.botonAccesible = !(this.forma.get('politicasDePrivacidad')?.value && usos);
    });

    this.forma.get('confirmarContrasena')?.valueChanges.subscribe((contra2) => {
      // console.log(this.forma.get('contrasena')?.value, contra2)
      if (this.forma.get('contrasena')?.value === contra2) {
        this.contraseñaConcuerda = true;
      }
      else {
        this.contraseñaConcuerda = false;
      }
    });
  }

  registrar() {
    this.mensajesError();
    if (this.forma.valid && this.contraseñaConcuerda) {
      let usuario = new User();
      usuario.firstName = this.forma.get('nombre')?.value;
      usuario.lastName = this.forma.get('apellido')?.value;
      usuario.email = this.forma.get('correoElectronico')?.value;
      usuario.username = this.forma.get('nickname')?.value;
      usuario.password = this.forma.get('contrasena')?.value;
      this.peticiones.crearUsuario(usuario).subscribe(({ data }) => {
        let credencial = new Credential();
        credencial.username = this.forma.get('nickname')?.value;
        credencial.password = this.forma.get('contrasena')?.value;
        this.peticiones.iniciarSesion(credencial, (error) => {
          alert('Ha ocurrido un error. Refresque la pagina y intente de nuevo.')
        });
      }, (error) => {
        this.mensajesError(error.message, error);
      });
    }
  }

  mensajesError(errorMessage?: String, error?: any) {
    this.errorNombre = this.mensajeError.registrarNombre(
      (this.forma.get('nombre')?.hasError('required') ?? false),
      (this.forma.get('nombre')?.hasError('pattern') ?? false),
      (this.forma.get('nombre')?.hasError('minlength') ?? false)
    );

    this.errorApellido = this.mensajeError.registrarApellido(
      (this.forma.get('apellido')?.hasError('required') ?? false),
      (this.forma.get('apellido')?.hasError('pattern') ?? false),
    );

    this.errorCorreoElectronico = this.mensajeError.registrarCorreo(
      (this.forma.get('correoElectronico')?.hasError('required') ?? false),
      (this.forma.get('correoElectronico')?.hasError('email') ?? false),
    );

    this.errorNickname = this.mensajeError.registrarNickname(
      this.forma.get('nickname')?.hasError('required') ?? false,
      this.forma.get('nickname')?.hasError('minlength') ?? false,
    )

    this.errorContrasena = this.mensajeError.registrarContrasena(
      (this.forma.get('contrasena')?.hasError('required') ?? false),
      (this.forma.get('contrasena')?.hasError('minlength') ?? false)
    )

    this.errorConfirmarContrasena = this.mensajeError.registrarConfirmarContrasena(
      this.forma.get('confirmarContrasena')?.hasError('required') ?? false,
      this.contraseñaConcuerda
    )

    if (errorMessage) {
      switch (errorMessage) {
        case 'UNIQUE constraint failed: auth_user.username':
          this.errorNickname = 'Nombre de usuario ocupado.';
          this.forma.patchValue({
            nickname: "",
          })
          break;
        default:
          alert(error);
          break;
      }
    }
  }

}