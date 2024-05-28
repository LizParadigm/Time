import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertaConfiguracion } from 'src/app/core/models/alertaConfiguracion.model';
import { AlertaRegistrada } from 'src/app/core/models/alertaRegistrada.model';
import { TipoAlerta } from 'src/app/core/models/tipoAlerta.model';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class TransportarService {
  // @Output() seccion:EventEmitter<TipoAlerta> = new EventEmitter();

  private seccionSubject = new BehaviorSubject<TipoAlerta | null>(null);
  seccion$ = this.seccionSubject.asObservable();

  private alertaSubject = new BehaviorSubject<[AlertaRegistrada, AlertaConfiguracion] | null>(null);
  alerta$ = this.alertaSubject.asObservable();

  private alertaDeleteSubject = new BehaviorSubject<[AlertaRegistrada, number] | [null, null]>([null, null]);
  alertaDelete$ = this.alertaDeleteSubject.asObservable();

  private dataAlertaSubject = new BehaviorSubject<[AlertaRegistrada, AlertaConfiguracion] | [null,null]>([null, null]);
  dataAlerta$ = this.dataAlertaSubject.asObservable();

  constructor() { }

  changeSeccion(alarma: TipoAlerta, i: number) {
    sessionStorage.setItem('seccion', i.toString())
    this.seccionSubject.next(alarma);
  }

  alerta(alerta: AlertaRegistrada, configuracion: AlertaConfiguracion) {
    this.alertaSubject.next([alerta, configuracion]);
  };

  alertaDelete(alarma: AlertaRegistrada, seccion: number) {
    this.alertaDeleteSubject.next([alarma, seccion]);
  };

  dataAlerta(alerta: AlertaRegistrada, configuracion: AlertaConfiguracion) {
    this.dataAlertaSubject.next([alerta, configuracion]);
  };
}
