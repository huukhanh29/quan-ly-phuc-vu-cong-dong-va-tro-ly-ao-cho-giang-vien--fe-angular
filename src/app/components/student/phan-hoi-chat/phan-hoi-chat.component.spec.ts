import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhanHoiChatComponent } from './phan-hoi-chat.component';

describe('PhanHoiChatComponent', () => {
  let component: PhanHoiChatComponent;
  let fixture: ComponentFixture<PhanHoiChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhanHoiChatComponent]
    });
    fixture = TestBed.createComponent(PhanHoiChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
