import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatDuLieuComponent } from './xuat-du-lieu.component';

describe('XuatDuLieuComponent', () => {
  let component: XuatDuLieuComponent;
  let fixture: ComponentFixture<XuatDuLieuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XuatDuLieuComponent]
    });
    fixture = TestBed.createComponent(XuatDuLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
