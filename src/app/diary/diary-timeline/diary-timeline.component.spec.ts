import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryTimelineComponent } from './diary-timeline.component';

describe('DiaryTimelineComponent', () => {
  let component: DiaryTimelineComponent;
  let fixture: ComponentFixture<DiaryTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
