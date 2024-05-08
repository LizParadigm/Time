import { TestBed } from '@angular/core/testing';

import { CrearComponentService } from './crear-component.service';

describe('CrearComponentService', () => {
  let service: CrearComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
