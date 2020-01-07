import { TestBed } from '@angular/core/testing';

import { MvestUserProfileService } from './mvest-user-profile.service';

describe('MvestUserProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MvestUserProfileService = TestBed.get(MvestUserProfileService);
    expect(service).toBeTruthy();
  });
});
