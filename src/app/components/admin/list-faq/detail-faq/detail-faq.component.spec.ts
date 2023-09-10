import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFaqComponent } from './detail-faq.component';

describe('DetailFaqComponent', () => {
  let component: DetailFaqComponent;
  let fixture: ComponentFixture<DetailFaqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailFaqComponent]
    });
    fixture = TestBed.createComponent(DetailFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
