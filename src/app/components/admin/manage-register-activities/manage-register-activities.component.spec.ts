import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRegisterActivitiesComponent } from './manage-register-activities.component';

describe('ManageRegisterActivitiesComponent', () => {
  let component: ManageRegisterActivitiesComponent;
  let fixture: ComponentFixture<ManageRegisterActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageRegisterActivitiesComponent]
    });
    fixture = TestBed.createComponent(ManageRegisterActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
