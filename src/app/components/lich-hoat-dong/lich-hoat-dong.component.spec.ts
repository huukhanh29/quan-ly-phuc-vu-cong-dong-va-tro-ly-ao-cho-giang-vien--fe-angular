import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LichHoatDongComponent } from './lich-hoat-dong.component';

describe('LichHoatDongComponent', () => {
  let component: LichHoatDongComponent;
  let fixture: ComponentFixture<LichHoatDongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LichHoatDongComponent]
    });
    fixture = TestBed.createComponent(LichHoatDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
