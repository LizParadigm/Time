import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmasPageComponent } from './alarmas-page.component';

describe('AlarmasPageComponent', () => {
  let component: AlarmasPageComponent;
  let fixture: ComponentFixture<AlarmasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmasPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlarmasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
