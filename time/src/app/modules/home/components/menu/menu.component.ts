import { Component, OnInit } from '@angular/core';
import { ComunService } from '@shared/services/comun/comun.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  constructor(
    public comun:ComunService
  ) { }

  ngOnInit(): void {
  }; 
}
