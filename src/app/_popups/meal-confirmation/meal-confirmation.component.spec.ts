import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealConfirmationComponent } from './meal-confirmation.component';

describe('MealConfirmationComponent', () => {
  let component: MealConfirmationComponent;
  let fixture: ComponentFixture<MealConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
