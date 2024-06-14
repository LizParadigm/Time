import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutService {
  private nombreSeccionSubject = new BehaviorSubject<string | null>(this.cambiarTitulo());
  nombreSeccion$ = this.nombreSeccionSubject.asObservable();

  constructor(
    private router: Router
  ) { }

  cambiarTitulo(): any {
    return sessionStorage.getItem('nombreSeccion') ?? 'T I M E';
  }
}
