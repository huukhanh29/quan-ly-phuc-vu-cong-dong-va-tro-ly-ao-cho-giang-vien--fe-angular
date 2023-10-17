import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChucDanhComponent } from './chuc-danh.component';

describe('ChucDanhComponent', () => {
  let component: ChucDanhComponent;
  let fixture: ComponentFixture<ChucDanhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChucDanhComponent]
    });
    fixture = TestBed.createComponent(ChucDanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
