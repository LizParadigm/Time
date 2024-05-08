import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroConfirmarDeleteComponent } from './cuadro-confirmar-delete.component';

describe('CuadroConfirmarDeleteComponent', () => {
  let component: CuadroConfirmarDeleteComponent;
  let fixture: ComponentFixture<CuadroConfirmarDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuadroConfirmarDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuadroConfirmarDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
