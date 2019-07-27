import { TestBed } from '@angular/core/testing';

import { ConfigHandlerService } from './config-handler.service';

describe('ConfigHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigHandlerService = TestBed.get(ConfigHandlerService);
    expect(service).toBeTruthy();
  });
});
