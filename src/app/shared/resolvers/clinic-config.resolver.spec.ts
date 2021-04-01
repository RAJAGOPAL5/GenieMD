import { TestBed } from '@angular/core/testing';

import { ClinicConfigResolver } from './clinic-config.resolver';

describe('ClinicConfigResolver', () => {
  let resolver: ClinicConfigResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ClinicConfigResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
