import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaDeleteComponent } from './alerta-delete.component';

describe('AlertaDeleteComponent', () => {
  let component: AlertaDeleteComponent;
  let fixture: ComponentFixture<AlertaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertaDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
