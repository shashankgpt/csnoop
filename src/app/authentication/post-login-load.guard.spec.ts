import { TestBed, async, inject } from '@angular/core/testing';

import { PostLoginLoadGuard } from './post-login-load.guard';

describe('PostLoginLoadGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostLoginLoadGuard]
    });
  });

  it('should ...', inject([PostLoginLoadGuard], (guard: PostLoginLoadGuard) => {
    expect(guard).toBeTruthy();
  }));
});
