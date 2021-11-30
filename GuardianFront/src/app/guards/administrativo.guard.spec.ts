import { TestBed } from '@angular/core/testing';

import { AdministrativoGuard } from './administrativo.guard';

describe('AdministrativoGuard', () => {
  let guard: AdministrativoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdministrativoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
