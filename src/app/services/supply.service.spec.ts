import { TestBed, inject } from '@angular/core/testing';

import { SupplyService } from './supply.service';

describe('SupplyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplyService]
    });
  });

  it('should be created', inject([SupplyService], (service: SupplyService) => {
    expect(service).toBeTruthy();
  }));
});
