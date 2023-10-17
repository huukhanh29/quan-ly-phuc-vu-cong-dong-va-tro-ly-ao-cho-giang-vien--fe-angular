import { TestBed } from '@angular/core/testing';

import { LoaiHoatDongService } from './loai-hoat-dong.service';

describe('LoaiHoatDongService', () => {
  let service: LoaiHoatDongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaiHoatDongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
