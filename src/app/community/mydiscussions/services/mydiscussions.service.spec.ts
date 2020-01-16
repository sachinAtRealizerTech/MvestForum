import { TestBed } from '@angular/core/testing';

import { MydiscussionsService } from './mydiscussions.service';

describe('MydiscussionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MydiscussionsService = TestBed.get(MydiscussionsService);
    expect(service).toBeTruthy();
  });
});
