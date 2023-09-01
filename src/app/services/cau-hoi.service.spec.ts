import { TestBed } from '@angular/core/testing';

import { CauHoiService } from './cau-hoi.service';

describe('CauHoiService', () => {
  let service: CauHoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CauHoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
