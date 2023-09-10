import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLecturerComponent } from './list-lecturer.component';

describe('ListLecturerComponent', () => {
  let component: ListLecturerComponent;
  let fixture: ComponentFixture<ListLecturerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListLecturerComponent]
    });
    fixture = TestBed.createComponent(ListLecturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
