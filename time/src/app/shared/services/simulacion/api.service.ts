import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as data from '@data/usuarios.json'
import { AlertaConfiguracion } from 'src/app/core/models/alertaConfiguracion.model';
import { usuario } from 'src/app/core/models/usuario.model';
import * as codigosR from '@data/codigosRecuperacion.json';
import { CodigosRecuperacion } from 'src/app/core/models/codigosRecuperacion.modal';
import { Apollo, gql } from 'apollo-angular';
import { Alerta } from 'src/app/core/models/alerta.model';
import { seccionConfiguracion } from 'src/app/core/models/seccionConfiguracion.model';
import { TransportarService } from '../transportador/transportar.service';
import { map } from 'rxjs/operators';

const OBTENERALERTASPORSECCION = gql`
query ObtenerAlertasPorSeccion($seccionId: ID!) {
  alertasPorSeccion(seccionId: $seccionId) {
    id
    titulo
    reloj
    icono
    imagen
    cantidad
    duracion {
      duracion1
      duracion2
    }
    fecha
    inicia
    termina
    repetirMinutos
    repetirHoras
    notificarAntesMinutos
    notificarAntesHoras
    tono
    dias {
      lunes
      martes
      miercoles
      jueves
      viernes
      sabado
      domingo
    }
    descripcion
  }
}
`;

const CREARALERTA = gql`
      mutation CreateAlerta($input: CreateAlertaInput!) {
        createAlerta(input: $input) {
          alerta {
            id
            titulo
            reloj
            icono
            imagen
            cantidad
            duracion {
              duracion1
              duracion2
            }
            fecha
            inicia
            termina
            repetirMinutos
            notificarAntesMinutos
            tono
            dias {
              lunes
              martes
              miercoles
              jueves
              viernes
              sabado
              domingo
            }
            descripcion
            seccion {
              id
              nombre
            }
          }
        }
      }
    `;

const OBTENERSECCIONES = gql`
  query ObtenerSeccionesUsuario($userId: ID!) {
    seccionesUsuario(userId: $userId) {
      id
      nombre
      configuration {
        id
        titulo
        reloj
        icono
        imagen
        cantidad
        duracion
        fecha
        inicia
        termina
        repetirMinutos
        repetirHoras
        notificarAntesMinutos
        notificarAntesHoras
        tono
        dias
        descripcion
      }
    }
  }
`;

const OBTENER_SECCION_POR_ID = gql`
  query ObtenerSeccionPorId($id: ID!) {
    seccionPorId(id: $id) {
      id
      nombre
      
      # alertas {
      #   id
      #   titulo
      #   reloj
      #   icono
      #   imagen
      #   cantidad
      #   duracion {
      #     duracion1
      #     duracion2
      #   }
      #   fecha
      #   inicia
      #   termina
      #   repetirMinutos
      #   repetirHoras
      #   notificarAntesMinutos
      #   notificarAntesHoras
      #   tono
      #   dias {
      #     lunes
      #     martes
      #     miercoles
      #     jueves
      #     viernes
      #     sabado
      #     domingo
      #   }
      #   descripcion
      # }
      configuration {
        id
        titulo
        reloj
        icono
        imagen
        cantidad
        duracion
        fecha
        inicia
        termina
        repetirMinutos
        repetirHoras
        notificarAntesMinutos
        notificarAntesHoras
        tono
        dias
        descripcion
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private apollo: Apollo,
    private pasa: TransportarService
  ) { }

  obtenerAlertas() {
    console.log('-----------------------')
    return this.apollo
      .watchQuery({
        query: OBTENERALERTASPORSECCION,
        variables: {
          seccionId: sessionStorage.getItem('idSeccion'),
        },
      })
      .valueChanges.pipe(map((result: any) => result.data.alertasPorSeccion));
  }
  

  crearAlerta(input: Alerta) {
    this.mandarAlerta(input).subscribe((response: any) => {
      console.log(response)
    }, (error) => {
      console.log(error)
    })
  }

  mandarAlerta(input: Alerta) {
    let seccionId = sessionStorage.getItem('idSeccion')
    return this.apollo.mutate({
      mutation: CREARALERTA,
      variables: {
        input: {
          // seccionId,
          ...input
        }
      }
    });
  }

  seccion() {
    let i: seccionConfiguracion
    this.obtenerSeccion(parseInt(sessionStorage.getItem("idSeccion") ?? '')).subscribe((response: any) => {
      this.pasa.seccionConfig(response.data.seccionPorId.config)
      // this.pasa.alertas(response.data.seccionPorId.alertas)
      console.log('seccion: ', response)
    }, (error) => {
      alert(error)
    }
    )
  }

  obtenerSeccion(id: number) {
    console.log('id: ', id)
    return this.apollo.query({
      query: OBTENER_SECCION_POR_ID,
      variables: {
        id: id
      }
    })
  }

  obtenerSecciones() {
    console.log('paso 3', parseInt(sessionStorage.getItem("idUsuario") ?? ''));
    return this.apollo.query({
      query: OBTENERSECCIONES,
      variables: {
        userId: parseInt(sessionStorage.getItem("idUsuario") ?? '')
      }
    });
  }
  // ----------------------------------------------------------
  buscarCorreo(correo: string): boolean {
    const { usuarios }: any = (data as any);
    let existe: boolean = false;
    usuarios.forEach((usuario: usuario) => {
      if (usuario.correo === correo) {
        existe = true;
        return;
      }
    });
    return existe
  }

  comprobarContrasena(correo: string, contra: string): boolean {
    const { usuarios }: any = (data as any).default;
    let correcta: boolean = false;
    usuarios.forEach((usuario: usuario) => {
      if (usuario.contraseña === contra) {
        correcta = true;
        return;
      }
    });
    return correcta;
  }

  obtenerUsuario(correo: string, contra: string): usuario {
    const { usuarios }: any = (data as any).default;
    let datosUsuario!: usuario;
    usuarios.forEach((usuario: usuario) => {
      if (usuario.correo === correo && usuario.contraseña === contra) {
        datosUsuario = usuario;
        return;
      }
    });
    return datosUsuario;
  }

  obtenerReloj(hora: string): string {
    return 'assets/media/relog-vacio.png';
  }

  alertaDelete(id: number | null, seccion: number | null): boolean {
    let terminado: boolean = true;
    return terminado
  }

  modificarAlerta(correo: string, contra: string, seccion: number, id_alerta: number, configuracion: AlertaConfiguracion, datos: FormGroup): boolean {
    /*se envian los datos que la funcion recibe y se retorna un boolean indicando si el proceso fue un exito o no*/
    return true
  }

  verificarCodigo(codigo: string, correo: string): boolean {
    const codigos: CodigosRecuperacion[] = (codigosR as any).default;
    let codigoCorrecto: boolean = false;
    console.log(codigos)

    codigos.forEach((dato: CodigosRecuperacion) => {
      if (dato.correo === correo && dato.codigo === codigo) {
        codigoCorrecto = true;
      }
    })

    return codigoCorrecto;
  }

}
