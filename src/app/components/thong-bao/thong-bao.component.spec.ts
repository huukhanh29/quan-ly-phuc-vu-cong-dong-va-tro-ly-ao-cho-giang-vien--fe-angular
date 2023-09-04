import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongBaoComponent } from './thong-bao.component';

describe('ThongBaoComponent', () => {
  let component: ThongBaoComponent;
  let fixture: ComponentFixture<ThongBaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongBaoComponent]
    });
    fixture = TestBed.createComponent(ThongBaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
