import { TestBed } from '@angular/core/testing';

import { TruongService } from './truong.service';

describe('TruongService', () => {
  let service: TruongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
