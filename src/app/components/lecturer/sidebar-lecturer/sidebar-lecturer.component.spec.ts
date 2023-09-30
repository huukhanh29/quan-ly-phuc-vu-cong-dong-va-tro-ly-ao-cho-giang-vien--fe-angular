import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLecturerComponent } from './sidebar-lecturer.component';

describe('SidebarLecturerComponent', () => {
  let component: SidebarLecturerComponent;
  let fixture: ComponentFixture<SidebarLecturerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarLecturerComponent]
    });
    fixture = TestBed.createComponent(SidebarLecturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
