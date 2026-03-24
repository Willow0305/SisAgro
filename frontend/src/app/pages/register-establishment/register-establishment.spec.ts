import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEstablishment } from './register-establishment';

describe('RegisterEstablishment', () => {
  let component: RegisterEstablishment;
  let fixture: ComponentFixture<RegisterEstablishment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterEstablishment],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterEstablishment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
