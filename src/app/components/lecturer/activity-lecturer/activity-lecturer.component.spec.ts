import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLecturerComponent } from './activity-lecturer.component';

describe('ActivityLecturerComponent', () => {
  let component: ActivityLecturerComponent;
  let fixture: ComponentFixture<ActivityLecturerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityLecturerComponent]
    });
    fixture = TestBed.createComponent(ActivityLecturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
