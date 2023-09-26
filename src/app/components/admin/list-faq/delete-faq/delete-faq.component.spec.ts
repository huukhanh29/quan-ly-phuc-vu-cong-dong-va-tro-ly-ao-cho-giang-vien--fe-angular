import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFaqComponent } from './delete-faq.component';

describe('DeleteFaqComponent', () => {
  let component: DeleteFaqComponent;
  let fixture: ComponentFixture<DeleteFaqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFaqComponent]
    });
    fixture = TestBed.createComponent(DeleteFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
