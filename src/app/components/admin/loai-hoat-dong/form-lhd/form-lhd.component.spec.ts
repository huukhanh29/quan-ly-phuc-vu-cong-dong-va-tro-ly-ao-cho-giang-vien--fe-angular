import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLhdComponent } from './form-lhd.component';

describe('FormLhdComponent', () => {
  let component: FormLhdComponent;
  let fixture: ComponentFixture<FormLhdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormLhdComponent]
    });
    fixture = TestBed.createComponent(FormLhdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
