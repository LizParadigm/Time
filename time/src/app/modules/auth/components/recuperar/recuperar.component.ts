import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth/auth.service';
import { MensajeErrorService } from '@shared/services/mensajeError/mensaje-error.service';
import { ApiService } from '@shared/services/simulacion/api.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.css'
})
export class RecuperarComponent implements OnInit {
  errorCorreoElectronico: string = '';
  errorCodigo:string = '';
  correoExiste: boolean = false;
  contrasenaCorrecta: boolean = false;
  // pasos:
  paso1: boolean = true;
  paso2: boolean = false;
  paso3: boolean = false;


  datosRecuperar!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService,
    private mensajeerror: MensajeErrorService,
    private api: ApiService
  ) { }

  ngOnInit(): void {

    this.datosRecuperar = this.fb.group({
      correoElectronico: ['', [
        Validators.required,
        Validators.email], [
        /*validar si el correo existe en la base de datos.*/]
      ],
      codigo: ['',[
        Validators.required,
        Validators.minLength(7)
      ],[
        //validar si el codigo es el codigo correcto.
      ]]
    });
    this.datosRecuperar.get('correoElectronico')?.valueChanges.subscribe((correo) => {
      this.correoExiste = this.authservice.validarCorreoExistente(correo)
    });
  };
  verificarCodigo(){
    return this.api.verificarCodigo(this.datosRecuperar.get('codigo')?.value ?? '', this.datosRecuperar.get('correoElectronico')?.value ?? '');
  }


  //botones:
  siguientePaso(): void {
    this.mensajesError();
    if (this.paso1 === true) {
      if (this.datosRecuperar.get('correoElectronico')?.valid) {
        this.paso1=false;
        this.paso2=true;
      }
    }
    // else if(this.paso2===true){
    //   // if(/* */){
    //   //   this.paso2=false;
    //   //   this.paso3=true;
    //   // }
    // }
  };

  recuperar() {

    this.mensajesError();

    // if (this.datosIngreso.valid && this.correoExiste && this.contrasenaCorrecta) {
    //   console.log('fase validar terminada :3');
    //   console.log('redireccionando')
    //   sessionStorage.setItem('correo', this.datosIngreso.get('correoElectronico')?.value);
    //   sessionStorage.setItem('contraseña', this.datosIngreso.get('contrasena')?.value);
    //   sessionStorage.setItem('tema', 'oscuro');
    //   this.router.navigateByUrl('/home');
    // }
    // else {
    //   console.log('notificacion error')
    // }
  }

  //metodos:

  //mensajes de error:
  mensajesError() {
    this.errorCorreoElectronico = this.mensajeerror.ingresarCorreo(
      (this.datosRecuperar.get('correoElectronico')?.hasError('required') ?? false),
      (this.datosRecuperar.get('correoElectronico')?.hasError('email') ?? false),
      (!this.correoExiste)
    );

    this.errorCodigo = this.mensajeerror.ingresarCodigoRecuperacion(
      this.datosRecuperar.get('codigo')?.hasError('required') ?? false,
      this.datosRecuperar.get('minLenght')?.hasError('minLenght') ?? false,
      this.verificarCodigo()
    )
  };
}