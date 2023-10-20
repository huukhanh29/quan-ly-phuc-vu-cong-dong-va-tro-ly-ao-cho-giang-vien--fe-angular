import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachGiangVienComponent } from './danh-sach-giang-vien.component';

describe('DanhSachGiangVienComponent', () => {
  let component: DanhSachGiangVienComponent;
  let fixture: ComponentFixture<DanhSachGiangVienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DanhSachGiangVienComponent]
    });
    fixture = TestBed.createComponent(DanhSachGiangVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
