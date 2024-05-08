import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarRecordatorioComponent } from './modificar-recordatorio.component';

describe('ModificarRecordatorioComponent', () => {
  let component: ModificarRecordatorioComponent;
  let fixture: ComponentFixture<ModificarRecordatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarRecordatorioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarRecordatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
