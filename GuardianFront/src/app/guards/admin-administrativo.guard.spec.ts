import { TestBed } from '@angular/core/testing';

import { AdminAdministrativoGuard } from './admin-administrativo.guard';

describe('AdminAdministrativoGuard', () => {
  let guard: AdminAdministrativoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminAdministrativoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
