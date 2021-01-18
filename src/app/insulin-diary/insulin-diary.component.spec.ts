import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsulinDiaryComponent } from './insulin-diary.component';

describe('InsulinDiaryComponent', () => {
  let component: InsulinDiaryComponent;
  let fixture: ComponentFixture<InsulinDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsulinDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsulinDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
