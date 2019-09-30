import { TestBed } from '@angular/core/testing';

import { DiscussionslistService } from './discussionslist.service';

describe('DiscussionslistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscussionslistService = TestBed.get(DiscussionslistService);
    expect(service).toBeTruthy();
  });
});
