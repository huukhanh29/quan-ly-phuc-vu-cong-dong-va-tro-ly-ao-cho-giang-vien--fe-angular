import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFooterComponent } from './student-footer.component';

describe('StudentFooterComponent', () => {
  let component: StudentFooterComponent;
  let fixture: ComponentFixture<StudentFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentFooterComponent]
    });
    fixture = TestBed.createComponent(StudentFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
