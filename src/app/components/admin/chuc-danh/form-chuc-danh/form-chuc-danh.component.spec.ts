import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChucDanhComponent } from './form-chuc-danh.component';

describe('FormChucDanhComponent', () => {
  let component: FormChucDanhComponent;
  let fixture: ComponentFixture<FormChucDanhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormChucDanhComponent]
    });
    fixture = TestBed.createComponent(FormChucDanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
