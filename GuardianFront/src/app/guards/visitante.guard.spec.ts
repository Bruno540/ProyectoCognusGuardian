import { TestBed } from '@angular/core/testing';

import { VisitanteGuard } from './visitante.guard';

describe('VisitanteGuard', () => {
  let guard: VisitanteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VisitanteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
