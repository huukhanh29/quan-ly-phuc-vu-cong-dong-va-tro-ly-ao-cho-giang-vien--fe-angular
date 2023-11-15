import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietHoatDongGvComponent } from './chi-tiet-hoat-dong-gv.component';

describe('ChiTietHoatDongGvComponent', () => {
  let component: ChiTietHoatDongGvComponent;
  let fixture: ComponentFixture<ChiTietHoatDongGvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietHoatDongGvComponent]
    });
    fixture = TestBed.createComponent(ChiTietHoatDongGvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
