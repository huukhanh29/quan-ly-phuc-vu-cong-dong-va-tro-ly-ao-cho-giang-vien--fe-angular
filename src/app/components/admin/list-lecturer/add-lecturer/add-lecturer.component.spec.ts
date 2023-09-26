import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLecturerComponent } from './add-lecturer.component';

describe('AddLecturerComponent', () => {
  let component: AddLecturerComponent;
  let fixture: ComponentFixture<AddLecturerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLecturerComponent]
    });
    fixture = TestBed.createComponent(AddLecturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
