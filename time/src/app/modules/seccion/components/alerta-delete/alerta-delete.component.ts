import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '@shared/services/simulacion/api.service';
import { TransportarService } from '@shared/services/transportador/transportar.service';
import { AlertaRegistrada } from 'src/app/core/models/alertaRegistrada.model';

@Component({
  selector: 'app-alerta-delete',
  templateUrl: './alerta-delete.component.html',
  styleUrl: './alerta-delete.component.css'
})
export class AlertaDeleteComponent implements OnInit {
  alerta!: AlertaRegistrada | null;
  seccion!: number | null;
  deleteCorrecto!: boolean;
  delete: boolean = true;

  constructor(
    private recibir: TransportarService,
    private dialog: DialogRef,
    private api: ApiService
  ) { };

  ngOnInit(): void {
    this.recibir.alertaDelete$.subscribe(datos => {
      [this.alerta, this.seccion] = datos;
    });
  };

  eliminar() {
    this.delete = false;
    if (this.api.alertaDelete(this.alerta?.id_alertaRegistrada ?? 1, this.seccion)) {
      this.deleteCorrecto = true;
      setTimeout(() => {
        this.salir();
      }, 3000); // 3000 ms = 3 seconds
    }
    else {
      this.deleteCorrecto = false;
    }
  };

  salir() { this.dialog.close(); };
}
