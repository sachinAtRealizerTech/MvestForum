import { TestBed } from '@angular/core/testing';

import { DiscussionlistService } from './discussionlist.service';

describe('DiscussionlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscussionlistService = TestBed.get(DiscussionlistService);
    expect(service).toBeTruthy();
  });
});
