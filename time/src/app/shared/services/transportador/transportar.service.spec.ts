import { TestBed } from '@angular/core/testing';

import { TransportarService } from './transportar.service';

describe('TransportarService', () => {
  let service: TransportarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
