import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomItemConfirmationComponent } from './custom-item-confirmation.component';

describe('CustomItemConfirmationComponent', () => {
  let component: CustomItemConfirmationComponent;
  let fixture: ComponentFixture<CustomItemConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomItemConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomItemConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
