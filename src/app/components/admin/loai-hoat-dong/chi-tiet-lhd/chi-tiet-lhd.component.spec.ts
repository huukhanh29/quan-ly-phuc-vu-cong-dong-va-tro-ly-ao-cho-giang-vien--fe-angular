import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietLhdComponent } from './chi-tiet-lhd.component';

describe('ChiTietLhdComponent', () => {
  let component: ChiTietLhdComponent;
  let fixture: ComponentFixture<ChiTietLhdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietLhdComponent]
    });
    fixture = TestBed.createComponent(ChiTietLhdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
