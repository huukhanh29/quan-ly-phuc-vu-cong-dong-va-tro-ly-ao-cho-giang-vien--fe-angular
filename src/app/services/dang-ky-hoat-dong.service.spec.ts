import { TestBed } from '@angular/core/testing';

import { DangKyHoatDongService } from './dang-ky-hoat-dong.service';

describe('DangKyHoatDongService', () => {
  let service: DangKyHoatDongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DangKyHoatDongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
