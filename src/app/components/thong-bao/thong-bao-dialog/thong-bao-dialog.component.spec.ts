import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongBaoDialogComponent } from './thong-bao-dialog.component';

describe('ThongBaoDialogComponent', () => {
  let component: ThongBaoDialogComponent;
  let fixture: ComponentFixture<ThongBaoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongBaoDialogComponent]
    });
    fixture = TestBed.createComponent(ThongBaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
