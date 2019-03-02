import { TestBed, inject } from '@angular/core/testing';

import { SalseService } from './salse.service';

describe('SalseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalseService]
    });
  });

  it('should be created', inject([SalseService], (service: SalseService) => {
    expect(service).toBeTruthy();
  }));
});
