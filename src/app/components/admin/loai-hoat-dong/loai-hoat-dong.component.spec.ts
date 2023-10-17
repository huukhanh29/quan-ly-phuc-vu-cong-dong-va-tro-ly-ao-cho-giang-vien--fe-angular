import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiHoatDongComponent } from './loai-hoat-dong.component';

describe('LoaiHoatDongComponent', () => {
  let component: LoaiHoatDongComponent;
  let fixture: ComponentFixture<LoaiHoatDongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaiHoatDongComponent]
    });
    fixture = TestBed.createComponent(LoaiHoatDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
