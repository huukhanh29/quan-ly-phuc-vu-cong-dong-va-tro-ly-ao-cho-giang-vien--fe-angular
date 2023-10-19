import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietHdntComponent } from './chi-tiet-hdnt.component';

describe('ChiTietHdntComponent', () => {
  let component: ChiTietHdntComponent;
  let fixture: ComponentFixture<ChiTietHdntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietHdntComponent]
    });
    fixture = TestBed.createComponent(ChiTietHdntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
