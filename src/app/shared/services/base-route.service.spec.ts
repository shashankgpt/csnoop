import { TestBed } from '@angular/core/testing';

import { BaseRouteService } from './base-route.service';

describe('BaseRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseRouteService = TestBed.get(BaseRouteService);
    expect(service).toBeTruthy();
  });
});
