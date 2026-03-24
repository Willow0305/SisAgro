import { TestBed } from '@angular/core/testing';

import { Informant } from './informant';

describe('Informant', () => {
  let service: Informant;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Informant);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
