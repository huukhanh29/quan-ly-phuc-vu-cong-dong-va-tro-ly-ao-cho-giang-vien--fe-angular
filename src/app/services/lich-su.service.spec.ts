import { TestBed } from '@angular/core/testing';

import { LichSuService } from './lich-su.service';

describe('LichSuService', () => {
  let service: LichSuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LichSuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
