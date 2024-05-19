import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth/auth.service';
import { MensajeErrorService } from '@shared/services/mensajeError/mensaje-error.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements OnInit{
  /*atributos*/
  errorNombre: string = "";
  errorApellido: string ="";
  errorCorreoElectronico: string = "";
  errorContrasena: string = "";
  errorConfirmarContrasena: string = "";
  correoExistente!: boolean;
  contraseñaConcuerda!: boolean;

  botonAccesible:boolean=true;

  forma!:FormGroup;

  
  /*constructor*/
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private mensajeError:MensajeErrorService,
    private authservice: AuthService
  ){
  }

  /*cliclo inicio*/
  ngOnInit(): void {
    this.forma = this.fb.group({
      nombre:['',[
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z\s]+$/)]
      ],

      apellido:['',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]],

      correoElectronico:['',[
        Validators.required,
        Validators.email],
      ],

      contrasena:['',[
        Validators.required,
        Validators.minLength(8)],
      ],

      confirmarContrasena:['',[
        Validators.required],
      ],

      politicasDePrivacidad:[false],

      usosYCondiciones:[false]
    })

    this.forma.get('politicasDePrivacidad')?.valueChanges.subscribe((politicas) => {
      this.botonAccesible = !(politicas && this.forma.get('usosYCondiciones')?.value);
    });
  
    this.forma.get('usosYCondiciones')?.valueChanges.subscribe((usos) => {
      this.botonAccesible = !(this.forma.get('politicasDePrivacidad')?.value && usos);
    });

    this.forma.get('confirmarContrasena')?.valueChanges.subscribe((contra2) => {
      console.log(this.forma.get('contrasena')?.value,contra2)
      if(this.forma.get('contrasena')?.value===contra2){
        this.contraseñaConcuerda=true;
      }
      else{
        this.contraseñaConcuerda=false;
      }
    });
  }
  /*botones*/
  registrar(){
    this.correoExistente = this.authservice.validarCorreoExistente(this.forma.get('correoElectronico')?.value)
    console.log('el correo existe: ',this.correoExistente)
    this.mensajesError();
    if (this.forma.valid && this.contraseñaConcuerda && !this.correoExistente){
      if(this.authservice.registrar((this.forma.value))) { 
        this.router.navigateByUrl('/inicio')
      }
      else{
        //notificacion error con servicios terceros
      }
    }
  }

  //mensajes de error
  //consultar si se deberia fragmentar de un solo metodo de mensajes de error, a un metodo para cada atributo "error..."
  mensajesError(){
    this.errorNombre = this.mensajeError.registrarNombre(
      (this.forma.get('nombre')?.hasError('required') ?? false),
      (this.forma.get('nombre')?.hasError('pattern') ?? false),
      (this.forma.get('nombre')?.hasError('minlength') ?? false)
    );

    this.errorApellido = this.mensajeError.registrarApellido(
      (this.forma.get('apellido')?.hasError('required') ?? false),
      (this.forma.get('apellido')?.hasError('pattern') ?? false),
    ),

    this.errorCorreoElectronico = this.mensajeError.registrarCorreo(
      (this.forma.get('correoElectronico')?.hasError('required') ?? false),
      (this.forma.get('correoElectronico')?.hasError('email') ?? false),
      (this.correoExistente)
    );

    this.errorContrasena = this.mensajeError.registrarContrasena(
      (this.forma.get('contrasena')?.hasError('required') ?? false),
      (this.forma.get('contrasena')?.hasError('minlength') ?? false)
    )

    this.errorConfirmarContrasena = this.mensajeError.registrarConfirmarContrasena(
      this.forma.get('confirmarContrasena')?.hasError('required') ?? false,
      this.contraseñaConcuerda
    )

  }

}