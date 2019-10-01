import { TestBed } from '@angular/core/testing';

import { DiscussiondetailsService } from './discussiondetails.service';

describe('DiscussiondetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscussiondetailsService = TestBed.get(DiscussiondetailsService);
    expect(service).toBeTruthy();
  });
});
