import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComunService } from '@shared/services/comun/comun.service';
import { ApiService } from '@shared/services/simulacion/api.service';
import { TipoAlerta } from 'src/app/core/models/tipoAlerta.model';
import { usuario } from 'src/app/core/models/usuario.model';

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrl: './generales.component.css'
})
export class GeneralesComponent implements OnInit {
  secciones!: TipoAlerta[];
  tema: string = 'oscuro';
  seccionSeleccionada: string = 'default';
  mensajeError: string = '';
  datosAjustes!: FormGroup;
  //definir una variable para guardar las secciones y sus alarmas borradas.

  constructor(
    private fb: FormBuilder,
    private pedir: ApiService,
    public comun: ComunService
  ) { }

  ngOnInit(): void {
    let usuario: usuario = this.pedir.obtenerUsuario(sessionStorage.getItem('correo') ?? '', sessionStorage.getItem('contraseña') ?? '');
    this.secciones = usuario.alertas;

    console.log(this.secciones)
    this.datosAjustes = this.fb.group({
      temaStyle: [''],
      seccionSeleccionada: ['']
    });

    this.datosAjustes.get('temaStyle')?.setValue(sessionStorage.getItem('tema')?.toString());
    this.datosAjustes.get('seccionSeleccionada')?.setValue('default');
  }


  /*botones*/

  public confirmarCambios(): void {
    console.log('el respaldo se a borrado y han confirmado cambios');
  };

  public cancelar(): void {
    console.log('se han reincorporado los datos del respaldo, saliendo');
  };

  public borrando(): void {
    console.log(this.datosAjustes.get('seccionSeleccionada')?.value)
    if (this.datosAjustes.get('seccionSeleccionada')?.value !== 'default') {
      console.log('la seccion:', this.datosAjustes.get('seccionSeleccionada')?.value, 'sera borrada')
    }
    else {
      console.log('esta seccion no puede ser borrada')
    }
  };

  public cTema():void{
    sessionStorage.setItem('tema', this.datosAjustes.get('temaStyle')?.value)
    this.comun.cambiarTema(sessionStorage.getItem('tema')?.toString()??'')
  }

  public guardarAjustes(): void {

  };

}
