import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlucoseDiaryComponent } from './glucose-diary.component';

describe('GlucoseDiaryComponent', () => {
  let component: GlucoseDiaryComponent;
  let fixture: ComponentFixture<GlucoseDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlucoseDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlucoseDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
