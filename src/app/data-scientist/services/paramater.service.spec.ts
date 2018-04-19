import { TestBed, inject } from '@angular/core/testing';

import { ParamaterService } from './paramater.service';

describe('ParamaterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParamaterService]
    });
  });

  it('should be created', inject([ParamaterService], (service: ParamaterService) => {
    expect(service).toBeTruthy();
  }));
});
