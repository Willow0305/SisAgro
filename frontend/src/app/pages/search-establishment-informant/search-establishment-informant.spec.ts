import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEstablishmentInformantComponent } from './search-establishment-informant.component';

describe('SearchEstablishmentInformantComponent', () => {
  let component: SearchEstablishmentInformantComponent;
  let fixture: ComponentFixture<SearchEstablishmentInformantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchEstablishmentInformantComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchEstablishmentInformantComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
