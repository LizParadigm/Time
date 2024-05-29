import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComunService } from '@shared/services/comun/comun.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy{

  constructor(
    private tema:ComunService
  ) {}

  ngOnInit(): void {
    this.tema.cambiarTema(sessionStorage.getItem('tema')?.toString() ?? '')
  }

  ngOnDestroy(): void {
    sessionStorage.clear();
    this.tema.cambiarTema('default')

  }

}
