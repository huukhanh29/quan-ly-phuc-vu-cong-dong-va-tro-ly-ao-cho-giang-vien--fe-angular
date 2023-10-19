import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuyetHdntComponent } from './duyet-hdnt.component';

describe('DuyetHdntComponent', () => {
  let component: DuyetHdntComponent;
  let fixture: ComponentFixture<DuyetHdntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuyetHdntComponent]
    });
    fixture = TestBed.createComponent(DuyetHdntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
