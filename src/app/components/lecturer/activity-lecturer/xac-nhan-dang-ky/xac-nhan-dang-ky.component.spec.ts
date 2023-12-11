import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XacNhanDangKyComponent } from './xac-nhan-dang-ky.component';

describe('XacNhanDangKyComponent', () => {
  let component: XacNhanDangKyComponent;
  let fixture: ComponentFixture<XacNhanDangKyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XacNhanDangKyComponent]
    });
    fixture = TestBed.createComponent(XacNhanDangKyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
