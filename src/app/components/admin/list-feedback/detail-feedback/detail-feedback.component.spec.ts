import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFeedbackComponent } from './detail-feedback.component';

describe('DetailFeedbackComponent', () => {
  let component: DetailFeedbackComponent;
  let fixture: ComponentFixture<DetailFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailFeedbackComponent]
    });
    fixture = TestBed.createComponent(DetailFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
