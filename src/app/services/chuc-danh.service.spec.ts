import { TestBed } from '@angular/core/testing';

import { ChucDanhService } from './chuc-danh.service';

describe('ChucDanhService', () => {
  let service: ChucDanhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChucDanhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
