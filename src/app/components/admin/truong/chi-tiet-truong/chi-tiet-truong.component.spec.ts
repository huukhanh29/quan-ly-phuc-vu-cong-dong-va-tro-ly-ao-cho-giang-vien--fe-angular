import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietTruongComponent } from './chi-tiet-truong.component';

describe('ChiTietTruongComponent', () => {
  let component: ChiTietTruongComponent;
  let fixture: ComponentFixture<ChiTietTruongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietTruongComponent]
    });
    fixture = TestBed.createComponent(ChiTietTruongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
