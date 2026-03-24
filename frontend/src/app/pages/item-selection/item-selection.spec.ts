import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSelection } from './item-selection';

describe('ItemSelection', () => {
  let component: ItemSelection;
  let fixture: ComponentFixture<ItemSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSelection],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
