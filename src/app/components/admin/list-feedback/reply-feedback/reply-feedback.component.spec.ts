import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyFeedbackComponent } from './reply-feedback.component';

describe('ReplyFeedbackComponent', () => {
  let component: ReplyFeedbackComponent;
  let fixture: ComponentFixture<ReplyFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplyFeedbackComponent]
    });
    fixture = TestBed.createComponent(ReplyFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
