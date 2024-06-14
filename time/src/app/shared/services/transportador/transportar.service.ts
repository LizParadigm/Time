import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alerta } from 'src/app/core/models/alerta.model';
import { AlertaConfiguracion } from 'src/app/core/models/alertaConfiguracion.model';
import { AlertaRegistrada } from 'src/app/core/models/alertaRegistrada.model';
import { seccionConfiguracion } from 'src/app/core/models/seccionConfiguracion.model';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class TransportarService {
//-------------------------------------------------------------------------------------
  private alertaDeleteSubject = new BehaviorSubject<[AlertaRegistrada, number] | [null, null]>([null, null]);
  alertaDelete$ = this.alertaDeleteSubject.asObservable();

  private dataAlertaSubject = new BehaviorSubject<[AlertaRegistrada, AlertaConfiguracion] | [null, null]>([null, null]);
  dataAlerta$ = this.dataAlertaSubject.asObservable();
  //-------------------------------------------------------------------------------------

  private seccionConfigSubject = new BehaviorSubject<seccionConfiguracion | null>(null);
  seccionConfig$ = this.seccionConfigSubject.asObservable();

  private alertasSubject = new BehaviorSubject<Alerta[] | null>(null);
  alertas$ = this.alertasSubject.asObservable();

  private seccionNombreSubject = new BehaviorSubject < String|null >(null);
  seccionNombre$ = this.seccionNombreSubject.asObservable() ;

  constructor() { }
//-------------------------------------------------------------------------------------
  alertaDelete(alarma: AlertaRegistrada, seccion: number) {
    this.alertaDeleteSubject.next([alarma, seccion]);
  };

  dataAlerta(alerta: AlertaRegistrada, configuracion: AlertaConfiguracion) {
    this.dataAlertaSubject.next([alerta, configuracion]);
  };
//-------------------------------------------------------------------------------------

  seccionConfig(config: seccionConfiguracion) {
    this.seccionConfigSubject.next(config);
  }

  alertas(alertas: Alerta[]) {
    this.alertasSubject.next(alertas);
  }

  seccionNombre(nombre:String){
    this.seccionNombreSubject.next(nombre);
  }
}
