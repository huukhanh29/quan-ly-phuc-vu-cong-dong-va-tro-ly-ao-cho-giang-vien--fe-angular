import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageActivityLecturerComponent } from './manage-activity-lecturer.component';

describe('ManageActivityLecturerComponent', () => {
  let component: ManageActivityLecturerComponent;
  let fixture: ComponentFixture<ManageActivityLecturerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageActivityLecturerComponent]
    });
    fixture = TestBed.createComponent(ManageActivityLecturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
