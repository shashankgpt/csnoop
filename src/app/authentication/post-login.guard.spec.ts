import { TestBed, async, inject } from '@angular/core/testing';

import { PostLoginGuard } from './post-login.guard';

describe('PostLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostLoginGuard]
    });
  });

  it('should ...', inject([PostLoginGuard], (guard: PostLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
