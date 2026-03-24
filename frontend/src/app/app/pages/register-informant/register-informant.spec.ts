import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInformant } from './register-informant';

describe('RegisterInformant', () => {
  let component: RegisterInformant;
  let fixture: ComponentFixture<RegisterInformant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterInformant],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterInformant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
