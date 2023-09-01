import { TestBed } from '@angular/core/testing';

import { TaiKhoanService } from './tai-khoan.service';

describe('TaiKhoanService', () => {
  let service: TaiKhoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaiKhoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
