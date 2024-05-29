import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComunService {

  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2
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
}
