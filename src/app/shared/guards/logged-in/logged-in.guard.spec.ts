import { TestBed } from '@angular/core/testing';

import { LoggedInGuard } from './logged-in.guard';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/services/auth/auth.service';

describe('LoggedInGuard', () => {
  let guard: LoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: {} },
        { provide: AuthService, useValue: {} },
        LoggedInGuard,
      ],
    });

    guard = TestBed.inject(LoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
