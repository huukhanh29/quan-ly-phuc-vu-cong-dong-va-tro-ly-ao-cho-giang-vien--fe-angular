import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietKhoaComponent } from './chi-tiet-khoa.component';

describe('ChiTietKhoaComponent', () => {
  let component: ChiTietKhoaComponent;
  let fixture: ComponentFixture<ChiTietKhoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietKhoaComponent]
    });
    fixture = TestBed.createComponent(ChiTietKhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
