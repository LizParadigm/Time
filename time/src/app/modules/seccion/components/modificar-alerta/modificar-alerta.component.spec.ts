import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAlertaComponent } from './modificar-alerta.component';

describe('ModificarAlertaComponent', () => {
  let component: ModificarAlertaComponent;
  let fixture: ComponentFixture<ModificarAlertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarAlertaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
