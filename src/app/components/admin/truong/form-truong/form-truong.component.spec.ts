import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTruongComponent } from './form-truong.component';

describe('FormTruongComponent', () => {
  let component: FormTruongComponent;
  let fixture: ComponentFixture<FormTruongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormTruongComponent]
    });
    fixture = TestBed.createComponent(FormTruongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
