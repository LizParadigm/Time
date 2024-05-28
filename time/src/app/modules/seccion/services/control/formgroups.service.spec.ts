import { TestBed } from '@angular/core/testing';

import { FormgroupsService } from './formgroups.service';

describe('FormgroupsService', () => {
  let service: FormgroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormgroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
