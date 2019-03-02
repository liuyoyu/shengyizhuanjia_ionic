import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationCodeService } from './authentication-code.service';

describe('AuthenticationCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationCodeService]
    });
  });

  it('should be created', inject([AuthenticationCodeService], (service: AuthenticationCodeService) => {
    expect(service).toBeTruthy();
  }));
});
