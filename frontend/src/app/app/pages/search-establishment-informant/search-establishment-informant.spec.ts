import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEstablishmentInformant } from './search-establishment-informant';

describe('SearchEstablishmentInformant', () => {
  let component: SearchEstablishmentInformant;
  let fixture: ComponentFixture<SearchEstablishmentInformant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchEstablishmentInformant],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchEstablishmentInformant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
