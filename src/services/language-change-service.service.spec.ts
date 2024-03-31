import { TestBed } from '@angular/core/testing';

import { LanguageChangeServiceService } from './language-change-service.service';

describe('LanguageChangeServiceService', () => {
  let service: LanguageChangeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageChangeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
