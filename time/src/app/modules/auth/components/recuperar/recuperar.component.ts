import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth/auth.service';
import { MensajeErrorService } from '@shared/services/mensajeError/mensaje-error.service';
import { ApiService } from '@shared/services/simulacion/api.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.css'
})
export class RecuperarComponent implements OnInit {
  errorCorreoElectronico: string = '';
  errorCodigo: string = '';
  errorContrasena: string = '';
  errorConfirmarContrasena: string = '';
  // correoExiste!: boolean;
  contraseñaConcuerda!: boolean;
  // pasos:
  paso1: boolean = true;
  paso2: boolean = false;
  paso3: boolean = false;
  mensaje: boolean = false;


  datosRecuperar!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private peticiones: AuthService,
    private mensajeerror: MensajeErrorService,
    private api: ApiService
  ) { }

  ngOnInit(): void {

    this.datosRecuperar = this.fb.group({
      correoElectronico: ['', [Validators.required, Validators.email], [/*validar si el correo existe en la base de datos.*/]],
      codigo: ['', [Validators.required, Validators.minLength(7)], [/*validar si el codigo es el codigo correcto. */]],
      contrasena: ['', [Validators.required, Validators.minLength(8)],],
      confirmarContrasena: ['', [Validators.required],],
    });

    this.datosRecuperar.get('confirmarContrasena')?.valueChanges.subscribe((contra2) => {
      console.log('contraseña: ', this.datosRecuperar.get('contrasena')?.value)
      console.log('contraseña reconfirmar:', contra2)
      if (this.datosRecuperar.get('contrasena')?.value === contra2) {
        this.contraseñaConcuerda = true;
      }
      else {
        this.contraseñaConcuerda = false;
      }
    });
  };

  verificarCodigo() {
    return this.api.verificarCodigo(this.datosRecuperar.get('codigo')?.value ?? '', this.datosRecuperar.get('correoElectronico')?.value ?? '');
  }

  //botones:
  siguientePaso(): void {
    if (this.paso2 === true) {
      this.errorCodigo = this.mensajeerror.ingresarCodigoRecuperacion(
        this.datosRecuperar.get('codigo')?.hasError('required') ?? false,
        this.datosRecuperar.get('minLenght')?.hasError('minLenght') ?? false,
        this.verificarCodigo()
      );
      if (this.verificarCodigo()) {
        this.paso2 = false;
        this.paso3 = true;
      }
    }
    else if (this.paso3 === true) {
      this.errorContrasena = this.mensajeerror.registrarContrasena(
        (this.datosRecuperar.get('contrasena')?.hasError('required') ?? false),
        (this.datosRecuperar.get('contrasena')?.hasError('minlength') ?? false)
      )

      this.errorConfirmarContrasena = this.mensajeerror.registrarConfirmarContrasena(
        this.datosRecuperar.get('confirmarContrasena')?.hasError('required') ?? false,
        this.contraseñaConcuerda
      )
      if (this.datosRecuperar.valid && this.contraseñaConcuerda) {
        this.paso3 = false;
        this.mensaje = true;
        this.recuperar();
      }
      else {
        console.log('notificacion error')
      }
    }

  };
  pasoUno() {
    this.errorCorreoElectronico = this.mensajeerror.ingresarCorreo(
      (this.datosRecuperar.get('correoElectronico')?.hasError('required') ?? false),
      (this.datosRecuperar.get('correoElectronico')?.hasError('email') ?? false),
    );
    if (this.datosRecuperar.get('correoElectronico')?.valid) {
      this.peticiones.verificarCorreoExistente(this.datosRecuperar.get('correoElectronico')?.value ?? '').subscribe((result: any) => {
        console.log('verificacion exitosa: ', result.data.correo);
        if (result.data.correo) {
          this.paso1 = false;
          this.paso2 = true;
        }
        else {
          this.errorCorreoElectronico = 'Correo no encontrado.';
        }
      }, error => {
        alert(error)
      });
    }
  }

  pasoDos(){
    this.errorCodigo = this.mensajeerror.ingresarCodigoRecuperacion(
      this.datosRecuperar.get('codigo')?.hasError('required') ?? false,
      this.datosRecuperar.get('minLenght')?.hasError('minLenght') ?? false,
      this.verificarCodigo()
    );
    if (this.verificarCodigo()) {
      this.paso2 = false;
      this.paso3 = true;
    }
  }

  recuperar() {
    sessionStorage.setItem('correo', this.datosRecuperar.get('correoElectronico')?.value);
    sessionStorage.setItem('contraseña', this.datosRecuperar.get('contrasena')?.value);
    sessionStorage.setItem('tema', 'oscuro');
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 3000);

  }

  //metodos:

  //mensajes de error:

}