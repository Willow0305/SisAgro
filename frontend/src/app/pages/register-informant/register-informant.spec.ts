import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInformantComponent } from './register-informant.component';

describe('RegisterInformantComponent', () => {
  let component: RegisterInformantComponent;
  let fixture: ComponentFixture<RegisterInformantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterInformantComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterInformantComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
