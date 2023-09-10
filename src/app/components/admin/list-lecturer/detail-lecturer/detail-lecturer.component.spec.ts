import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLecturerComponent } from './detail-lecturer.component';

describe('DetailLecturerComponent', () => {
  let component: DetailLecturerComponent;
  let fixture: ComponentFixture<DetailLecturerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailLecturerComponent]
    });
    fixture = TestBed.createComponent(DetailLecturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
