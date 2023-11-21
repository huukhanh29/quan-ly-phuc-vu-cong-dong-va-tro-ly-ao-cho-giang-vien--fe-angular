import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGioGiamComponent } from './update-gio-giam.component';

describe('UpdateGioGiamComponent', () => {
  let component: UpdateGioGiamComponent;
  let fixture: ComponentFixture<UpdateGioGiamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateGioGiamComponent]
    });
    fixture = TestBed.createComponent(UpdateGioGiamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
