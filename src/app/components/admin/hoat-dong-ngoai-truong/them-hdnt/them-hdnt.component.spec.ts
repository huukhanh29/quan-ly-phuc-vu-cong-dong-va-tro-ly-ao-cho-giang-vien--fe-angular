import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemHdntComponent } from './them-hdnt.component';

describe('ThemHdntComponent', () => {
  let component: ThemHdntComponent;
  let fixture: ComponentFixture<ThemHdntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemHdntComponent]
    });
    fixture = TestBed.createComponent(ThemHdntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
