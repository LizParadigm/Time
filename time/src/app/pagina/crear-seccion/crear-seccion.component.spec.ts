import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSeccionComponent } from './crear-seccion.component';

describe('CrearSeccionComponent', () => {
  let component: CrearSeccionComponent;
  let fixture: ComponentFixture<CrearSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearSeccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
