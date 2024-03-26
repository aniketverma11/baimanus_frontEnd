import { TestBed } from '@angular/core/testing';

import { TextSizingService } from './text-sizing.service';

describe('TextSizingService', () => {
  let service: TextSizingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextSizingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
