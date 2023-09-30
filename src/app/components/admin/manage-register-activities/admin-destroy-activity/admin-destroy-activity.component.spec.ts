import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDestroyActivityComponent } from './admin-destroy-activity.component';

describe('AdminDestroyActivityComponent', () => {
  let component: AdminDestroyActivityComponent;
  let fixture: ComponentFixture<AdminDestroyActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDestroyActivityComponent]
    });
    fixture = TestBed.createComponent(AdminDestroyActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
