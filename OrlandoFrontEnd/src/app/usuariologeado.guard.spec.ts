import { TestBed } from '@angular/core/testing';

import { UsuariologeadoGuard } from './usuariologeado.guard';

describe('UsuariologeadoGuard', () => {
  let guard: UsuariologeadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuariologeadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
