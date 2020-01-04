import { TestBed, async, inject } from '@angular/core/testing';

import { PostLoginChildGuard } from './post-login-child.guard';

describe('PostLoginChildGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostLoginChildGuard]
    });
  });

  it('should ...', inject([PostLoginChildGuard], (guard: PostLoginChildGuard) => {
    expect(guard).toBeTruthy();
  }));
});
