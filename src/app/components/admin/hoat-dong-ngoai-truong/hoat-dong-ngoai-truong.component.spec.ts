import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoatDongNgoaiTruongComponent } from './hoat-dong-ngoai-truong.component';

describe('HoatDongNgoaiTruongComponent', () => {
  let component: HoatDongNgoaiTruongComponent;
  let fixture: ComponentFixture<HoatDongNgoaiTruongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoatDongNgoaiTruongComponent]
    });
    fixture = TestBed.createComponent(HoatDongNgoaiTruongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
