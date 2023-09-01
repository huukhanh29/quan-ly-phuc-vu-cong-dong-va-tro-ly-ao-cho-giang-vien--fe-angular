import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestlComponent } from './testl.component';

describe('TestlComponent', () => {
  let component: TestlComponent;
  let fixture: ComponentFixture<TestlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestlComponent]
    });
    fixture = TestBed.createComponent(TestlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
