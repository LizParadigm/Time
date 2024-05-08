import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMedicamentoComponent } from './modificar-medicamento.component';

describe('ModificarMedicamentoComponent', () => {
  let component: ModificarMedicamentoComponent;
  let fixture: ComponentFixture<ModificarMedicamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarMedicamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
