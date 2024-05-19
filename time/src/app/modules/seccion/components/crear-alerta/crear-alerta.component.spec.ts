import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAlertaComponent } from './crear-alerta.component';

describe('CrearAlertaComponent', () => {
  let component: CrearAlertaComponent;
  let fixture: ComponentFixture<CrearAlertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearAlertaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
