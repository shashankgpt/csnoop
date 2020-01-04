import { TestBed, async, inject } from '@angular/core/testing';

import { PreLoginGuard } from './pre-login.guard';

describe('PreLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreLoginGuard]
    });
  });

  it('should ...', inject([PreLoginGuard], (guard: PreLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
