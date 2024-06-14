import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ComunService {

  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    private router:Router
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public cambiarTema(tema: string) {
    if (tema === 'oscuro') {
      this.renderer.removeClass(document.body, 'claro');
      this.renderer.addClass(document.body, 'oscuro');
    } else {
      this.renderer.removeClass(document.body, 'oscuro');
      this.renderer.addClass(document.body, 'claro');
    }
  }

  cargarSeccion(idSeccion:number, nombreSeccion:String) {
    sessionStorage.setItem('idSeccion',idSeccion.toString());
    sessionStorage.setItem('nombreSeccion',nombreSeccion.toString());
    this.router.navigateByUrl('/home/seccion');
  }
} 
