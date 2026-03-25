import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEstablishmentComponent } from './register-establishment.component';

describe('RegisterEstablishmentComponent', () => {
  let component: RegisterEstablishmentComponent;
  let fixture: ComponentFixture<RegisterEstablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterEstablishmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterEstablishmentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
