import { TestBed } from '@angular/core/testing';

import { Establishment } from './establishment';

describe('Establishment', () => {
  let service: Establishment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Establishment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
