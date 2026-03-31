import { TestBed } from '@angular/core/testing';

import { InformantService } from './informant';

describe('Informant', () => {
  let service: InformantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
