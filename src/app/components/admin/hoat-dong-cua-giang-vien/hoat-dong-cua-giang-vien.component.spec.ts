import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoatDongCuaGiangVienComponent } from './hoat-dong-cua-giang-vien.component';

describe('HoatDongCuaGiangVienComponent', () => {
  let component: HoatDongCuaGiangVienComponent;
  let fixture: ComponentFixture<HoatDongCuaGiangVienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoatDongCuaGiangVienComponent]
    });
    fixture = TestBed.createComponent(HoatDongCuaGiangVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
