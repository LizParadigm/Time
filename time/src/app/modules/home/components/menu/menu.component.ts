import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComunService } from '@shared/services/comun/comun.service';
import { ApiService } from '@shared/services/simulacion/api.service';
import { TransportarService } from '@shared/services/transportador/transportar.service';
import { Seccion } from 'src/app/core/models/seccion.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  constructor(
    private transportar: TransportarService,
    private api: ApiService,
    private router: Router,
    private pasar: TransportarService,
    public comun:ComunService
  ) { }

  ngOnInit(): void {
  }; 
}
