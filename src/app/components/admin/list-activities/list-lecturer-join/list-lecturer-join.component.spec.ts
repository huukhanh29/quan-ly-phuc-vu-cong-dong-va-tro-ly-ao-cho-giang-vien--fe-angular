import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLecturerJoinComponent } from './list-lecturer-join.component';

describe('ListLecturerJoinComponent', () => {
  let component: ListLecturerJoinComponent;
  let fixture: ComponentFixture<ListLecturerJoinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListLecturerJoinComponent]
    });
    fixture = TestBed.createComponent(ListLecturerJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
