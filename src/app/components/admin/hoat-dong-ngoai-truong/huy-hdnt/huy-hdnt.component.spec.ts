import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuyHdntComponent } from './huy-hdnt.component';

describe('HuyHdntComponent', () => {
  let component: HuyHdntComponent;
  let fixture: ComponentFixture<HuyHdntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuyHdntComponent]
    });
    fixture = TestBed.createComponent(HuyHdntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
