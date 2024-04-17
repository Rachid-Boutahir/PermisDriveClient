import { TestBed } from '@angular/core/testing';

import { MoniteurService } from './moniteur.service';

describe('MoniteurService', () => {
  let service: MoniteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoniteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
