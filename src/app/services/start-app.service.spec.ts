import { TestBed, inject } from '@angular/core/testing';

import { StartAppService } from './start-app.service';

describe('StartAppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StartAppService]
    });
  });

  it('should be created', inject([StartAppService], (service: StartAppService) => {
    expect(service).toBeTruthy();
  }));
});
