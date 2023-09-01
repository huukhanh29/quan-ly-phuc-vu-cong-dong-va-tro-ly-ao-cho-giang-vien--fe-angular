import { TestBed } from '@angular/core/testing';

import { PhanHoiService } from './phan-hoi.service';

describe('PhanHoiService', () => {
  let service: PhanHoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhanHoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
