import { TestBed } from '@angular/core/testing';

import { EstablishmentService } from './establishment';

describe('Establishment', () => {
  let service: EstablishmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstablishmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
