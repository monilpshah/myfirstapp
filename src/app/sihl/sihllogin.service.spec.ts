import { TestBed, inject } from '@angular/core/testing';

import { SihlloginService } from './sihllogin.service';

describe('SihlloginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SihlloginService]
    });
  });

  it('should be created', inject([SihlloginService], (service: SihlloginService) => {
    expect(service).toBeTruthy();
  }));
});
