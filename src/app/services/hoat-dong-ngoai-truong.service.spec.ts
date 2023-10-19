import { TestBed } from '@angular/core/testing';

import { HoatDongNgoaiTruongService } from './hoat-dong-ngoai-truong.service';

describe('HoatDongNgoaiTruongService', () => {
  let service: HoatDongNgoaiTruongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoatDongNgoaiTruongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
