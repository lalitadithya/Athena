import { TestBed, inject } from '@angular/core/testing';

import { DataSetServiceService } from './data-set-service.service';

describe('DataSetServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataSetServiceService]
    });
  });

  it('should be created', inject([DataSetServiceService], (service: DataSetServiceService) => {
    expect(service).toBeTruthy();
  }));
});
