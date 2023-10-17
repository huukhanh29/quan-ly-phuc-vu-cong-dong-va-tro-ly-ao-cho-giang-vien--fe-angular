import { TestBed } from '@angular/core/testing';

import { KhoaService } from './khoa.service';

describe('KhoaService', () => {
  let service: KhoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
