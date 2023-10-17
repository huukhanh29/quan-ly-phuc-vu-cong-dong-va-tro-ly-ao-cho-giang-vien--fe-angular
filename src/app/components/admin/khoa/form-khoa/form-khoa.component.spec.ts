import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormKhoaComponent } from './form-khoa.component';

describe('FormKhoaComponent', () => {
  let component: FormKhoaComponent;
  let fixture: ComponentFixture<FormKhoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormKhoaComponent]
    });
    fixture = TestBed.createComponent(FormKhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
