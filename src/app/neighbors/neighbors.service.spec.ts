import { TestBed } from '@angular/core/testing';

import { NeighborsService } from './neighbors.service';

describe('NeighborsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NeighborsService = TestBed.get(NeighborsService);
    expect(service).toBeTruthy();
  });
});
